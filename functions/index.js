const functions = require('firebase-functions')
const admin = require('firebase-admin')
const moment = require('moment')
const secureCompare = require('secure-compare')
const uuid = require('uuid/v4')
const CryptoJS = require('crypto-js')
const cors = require('cors')({
  origin: 'https://tinythoughts.me'
})
const stripe = require('stripe')(functions.config().stripe.token)

admin.initializeApp(functions.config().firebase)

exports.sendNotifications = functions.https.onRequest((req, res) => {
  const key = (req.get('Authorization') || '').split('Basic ')[1]
  const hour = moment().utc().hour()

  if (!secureCompare(key, functions.config().cron.key)) {
    console.log('The key provided in the request does not match the key set in the environment.')
    res.status(403).send('Security key does not match. Make sure your "key" URL query parameter matches the ' +
        'cron.key environment variable.')
    return null
  }

  console.log('Checking for notifications for hour ', hour)

  return Promise.all([getUsersForHour(hour), getPrompt()])
    .then(sendNotificationsToAllUsers)
    .then(() => {
      res.end()
      return null
    })
    .catch(err => {
      console.log(err)
      res.status(500).send(err)
    })
})

function getUsersForHour(hour) {
  return admin.firestore().collection('users')
    .where('sendNotifications', '==', true)
    .where('reminderTime', '==', hour)
    .get()
}

function getPrompt() {
  const date = moment().format('MMMM D')
  return admin.firestore()
    .collection('prompts')
    .where('date', '==', date)
    .get()
}

function sendNotificationsToAllUsers([userSnapshot, promptSnapshot]) {
  let notificationPromises = []

  const prompts = []
  promptSnapshot.forEach(snapshot => {
    prompts.push(snapshot.data())
  })

  userSnapshot.forEach((snapshot) => {
    notificationPromises.push(sendNotificationToUser(snapshot, prompts))
  })

  return Promise.all(notificationPromises)
}

function sendNotificationToUser(snapshot, prompts) {
  const prompt = prompts.length ? prompts[0].prompt : "It's time to write in your journal today!"
  const user = snapshot.data()
  const tokens = Object.keys(user.messagingTokens || {})
  const payload = {
    notification: {
      title: 'tinythoughts',
      body: prompt,
      icon: 'https://lineaday-11542.firebaseapp.com/notebook.png',
      click_action: 'https://tinythoughts.me'
    }
  }

  if (tokens.length) {
    return admin.messaging().sendToDevice(tokens, payload)
      .then(response => {
          // For each message check if there was an error.
          const tokensToRemovePromises = []
          response.results.forEach((result, index) => {
            const error = result.error
            if (error) {
              console.log('Failure sending notification to', tokens[index], error)
              // Cleanup the tokens who are not registered anymore.
              if (error.code === 'messaging/invalid-registration-token' ||
                  error.code === 'messaging/registration-token-not-registered') {
                tokensToRemovePromises.push(removeToken(snapshot.id, tokens[index]))
              }
            }
          })
          return Promise.all(tokensToRemovePromises)
      })
  }

  return Promise.resolve()
}

function removeToken(userId, token) {
  return admin.firestore().collection('users').doc(userId).update({
    ['messagingTokens.' + token]: admin.firestore.FieldValue.delete()
  })
}

exports.setEncryptionKey = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    // Get the ID token passed.
    const idToken = req.body.data.idToken;
    const encryptionKey = uuid()
    // Verify the ID token and decode its payload.
    admin.auth().verifyIdToken(idToken)
      .then((claims) => {
        return admin.auth().setCustomUserClaims(claims.sub, {
          encryptionKey
        })
      })
      .then(() => {
        res.json({ encryptionKey })
        return null
      })
      .catch(err => {
        console.log(err)
        res.status(500).send(err)
      })
  })
})

const addEncryptionKeyToUsers = functions.https.onRequest((req, res) => {
  admin.auth().listUsers()
    .then((result) => {
      const promises = []
      result.users.forEach(user => {
        const encryptionKey = uuid()
        if (!user.customClaims || !user.customClaims.encryptionKey) {
          promises.push(admin.auth().setCustomUserClaims(user.uid, { encryptionKey }))
        }
      })

      return Promise.all(promises)
    })
    .then(() => {
      return res.end()
    })
    .catch(err => {
      console.log(err)
      res.status(500).send(err)
    })
})

const encryptTextForUser = functions.https.onRequest((req, res) => {
  const { userId } = req.body
  let encryptionKey

  admin.auth().getUser(userId)
    .then(userRecord => {
      encryptionKey = userRecord.customClaims.encryptionKey

      return admin.firestore()
        .collection('users')
        .doc(userId)
        .collection('lines').get()
    })
    .then(snapshot => {
      let promises = []

      snapshot.forEach(doc => {
        const text = doc.data().text
        const encryptedText = CryptoJS.AES.encrypt(text, encryptionKey).toString()
        const promise = admin.firestore()
          .collection('users')
          .doc(userId)
          .collection('lines')
          .doc(doc.id)
          .set({ text: encryptedText }, { merge: true })
        promises.push(promise)
      })

      return Promise.all(promises)
    })
    .then(() => {
      return res.end()
    })
    .catch(err => {
      console.log(err)
      res.status(500).send(err)
    })
})

exports.addSubscription = functions.https.onCall((data, context) => {
  const { stripeToken, stripePlan } = data

  if (!(typeof stripeToken === 'string') || stripeToken.length === 0) {
    throw new functions.https.HttpsError('invalid-argument', 'Stripe token is invalid.');
  }

  if (!(typeof stripePlan === 'string') || stripePlan.length === 0) {
    throw new functions.https.HttpsError('invalid-argument', 'Stripe plan is invalid.');
  }

  if (!context.auth) {
    throw new functions.https.HttpsError('failed-precondition',
      'The function must be called while authenticated.');
  }

  const { uid, token: { email } } = context.auth

  return admin.firestore().collection('users').doc(uid).get()
    .then(snapshot => {
      const user = snapshot.data()
      if (user.stripeId) {
        return Promise.resolve({ id: stripeId })
      }

      return stripe.customers.create({
        email: user.email,
        source: stripeToken
      })
    })
    .then(customer => {
      return stripe.subscriptions.create({
        customer: customer.id,
        items: [{
          plan: stripePlan
        }]
      })
    })
    .then(subscription => {
      const { id, customer } = subscription
      return admin.firestore()
        .collection('users')
        .doc(uid)
        .set({ stripeId: customer, subscription: id }, { merge: true })
    })
});
