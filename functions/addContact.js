const functions = require('firebase-functions')
const client = require('@sendgrid/client')
const admin = require('./init')

client.setApiKey(functions.config().sendgrid.key)

module.exports = functions.auth.user().onCreate((user) => {
  const { email, uid } = user
  const request = {
    method: 'POST',
    url: '/v3/contactdb/recipients',
    body: [{ email, firestore_id: uid }],
  }
  return client.request(request)
    .then(([response, body]) => {
      console.log(response.statusCode)
      console.log(body)

      return response.statusCode
    })
})

const addContacts = functions.https.onRequest((req, res) => {
  admin.auth().listUsers()
    .then((result) => {
      const emails = []
      result.users.forEach(user => {
        emails.push({ email: user.email, firestore_id: user.uid })
      })

      const request = {
        method: 'POST',
        url: '/v3/contactdb/recipients',
        body: emails,
      }

      return client.request(request)
    })
    .then(([response, body]) => {
      console.log(response.statusCode)
      console.log(body)
      return res.status(200)
    })
    .catch(err => {
      console.log(err)
      return res.status(500).send(err)
    })
})
