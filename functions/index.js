const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp(functions.config().firebase)

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.sendNotifications = functions.https.onRequest((req, res) => {
  const hour = req.body.hour

  if (hour !== 0 && !hour) {
    return res.status(422).send('Hour is required')
  }

  return getUsersForHour(hour)
    .then((snapshot) => {
      let notificationPromises = []
      snapshot.forEach((snapshot) => {
        notificationPromises.push(sendNotificationToUser(snapshot))
      })

      return Promise.all(notificationPromises)
    })
    .then((response) => {
      console.log('response is ', response)
      res.end()
      return null
    })
    .catch(console.log)

})

function getUsersForHour(hour) {
  return admin.firestore().collection('users')
    .where('sendNotifications', '==', true)
    .where('reminderTime', '==', hour)
    .get()
}

function sendNotificationToUser(snapshot) {
  const user = snapshot.data()
  const tokens = Object.keys(user.messagingTokens || {})
  const payload = {
    notification: {
      title: 'Remember!',
      body: "It's time to write in your journal",
    }
  }

  if (tokens.length) {
    return admin.messaging().sendToDevice(tokens, payload)
  }

  return Promise.resolve()
}
