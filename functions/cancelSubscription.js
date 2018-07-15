const functions = require('firebase-functions')
const admin = require('./init')

const { stripe, getSubscription } = require('./stripeUtils')

module.exports = functions.https.onCall((data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated',
      'The function must be called while authenticated.');
  }

  const { uid } = context.auth

  return admin.firestore().collection('users').doc(uid).get()
    .then(snapshot => {
      const { stripeId } = snapshot.data()
      return stripe.customers.retrieve(stripeId)
    })
    .then(customer => {
      const subscription = getSubscription(customer)
      return stripe.subscriptions.del(subscription.id, { at_period_end: true })
    })
    .then(({ cancel_at_period_end, current_period_end, status }) => {
      return {
        cancel_at_period_end,
        current_period_end,
        status
      }
    })
    .catch(err => {
      return Promise.reject(new functions.https.HttpsError('failed-precondition', err.message, { code: err.code }));
    })
});
