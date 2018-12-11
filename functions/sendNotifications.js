const functions = require('firebase-functions')
const secureCompare = require('secure-compare')
const moment = require('moment')
const Expo = require('expo-server-sdk')
const admin = require('./init')

const expo = new Expo()

const sendNotifications = functions.https.onRequest((req, res) => {
  const key = (req.get('Authorization') || '').split('Basic ')[1]
  const hour = moment().utc().hour()

  // if (!secureCompare(key, functions.config().cron.key)) {
  //   console.log('The key provided in the request does not match the key set in the environment.')
  //   res.status(403).send('Security key does not match. Make sure your "key" URL query parameter matches the ' +
  //       'cron.key environment variable.')
  //   return null
  // }

  console.log('Checking for notifications for hour ', hour)

  return Promise.all([getUsersForHour(hour), getPrompt()])
    .then(sendNotificationsToAllUsers)
    .then(() => {
      res.end()
      return null
    })
    .catch(err => {
      console.log('these errors', err)
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
  let expoMessages = []

  const prompts = []
  promptSnapshot.forEach(snapshot => {
    prompts.push(snapshot.data())
  })

  const prompt = prompts.length ? prompts[0].prompt : "It's time to write in your journal today!"

  userSnapshot.forEach((snapshot) => {
    notificationPromises.push(sendNotificationToUser(snapshot, prompt))
    expoMessages.push(...getExpoMessagesForUser(snapshot, prompt))
  })

  const expoNotifications = handleExpoNotifications(expoMessages)

  return Promise.all([...notificationPromises, ...expoNotifications])
}

function handleExpoNotifications(messages) {
  const chunks = expo.chunkPushNotifications(messages)
  const tickets = []

  return chunks.map(chunk => {
    return expo.sendPushNotificationsAsync(chunk)
      .then(ticketChunk => {
        console.log('ticket chunk: ', ticketChunk)
        tickets.push(...ticketChunk)
        return handleExpoResponses(tickets)
      })
      .catch((errors) => {
        console.log('what huh is it this?')
      })
  })
}

function handleExpoResponses(tickets) {
  let receiptIds = []
  tickets.forEach(ticket => {
    if (ticket.id) {
      receiptIds.push(ticket.id)
    }
  })

  const receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds)

  return receiptIdChunks.map(chunk => {
    return expo.getPushNotificationReceiptsAsync(chunk)
      .then(receipts => {
        console.log(receipts)
        receipts.forEach(receipt => {
          if (receipt.status === 'ok') {
            continue;
          } else if (receipt.status === 'error') {
            console.error(`There was an error sending a notification: ${receipt.message}`);
            if (receipt.details && receipt.details.error) {
              console.error(`The error code is ${receipt.details.error}`);
            }
          }
        })
      })
  })
}

function getExpoMessagesForUser(snapshot, prompt) {
  const user = snapshot.data()
  const expoTokens = Object.keys(user.expoTokens || {})

  return expoTokens.map(token => {
    if (!Expo.isExpoPushToken(token)) {
      console.error(`Push token ${token} is not a valid Expo push token`)
    }

    return {
      to: token,
      sound: 'default',
      body: prompt,
    }
  })
}

function sendNotificationToUser(snapshot, prompt) {
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

module.exports = sendNotifications
