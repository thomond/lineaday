const functions = require('firebase-functions')
const admin = require('firebase-admin')
const moment = require('moment')

admin.initializeApp()

exports.sendNotifications = functions.https.onRequest((req, res) => {
  const hour = moment().utc().hour()

  console.log('Checking for notifications for hour ', hour)

  return getUsersForHour(hour)
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

function sendNotificationsToAllUsers(snapshot) {
  let notificationPromises = []
  snapshot.forEach((snapshot) => {
    notificationPromises.push(sendNotificationToUser(snapshot))
  })

  return Promise.all(notificationPromises)
}

function sendNotificationToUser(snapshot) {
  const user = snapshot.data()
  const tokens = Object.keys(user.messagingTokens || {})
  const payload = {
    notification: {
      title: 'tinythoughts',
      body: "It's time to write in your journal today!",
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
