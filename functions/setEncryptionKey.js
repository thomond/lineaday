const functions = require('firebase-functions')
const uuid = require('uuid/v4')
const CryptoJS = require('crypto-js')
const admin = require('./init')

module.exports = functions.https.onCall((data, context) => {
  // Get the ID token passed.
  const { idToken } = data
  const encryptionKey = uuid()
  // Verify the ID token and decode its payload.
  return admin.auth().verifyIdToken(idToken)
    .then((claims) => {
      return admin.auth().setCustomUserClaims(claims.sub, {
        encryptionKey
      })
    })
    .then(() => {
      return { encryptionKey }
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
