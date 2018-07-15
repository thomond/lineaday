const functions = require('firebase-functions')
const admin = require('./init')
const { stripe, getCCInfo, getSubscription } = require('./stripeUtils')

module.exports = functions.https.onCall((data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated',
      'The function must be called while authenticated.');
  }

  const { uid } = context.auth

  return admin.firestore().collection('users').doc(uid).get()
    .then(snapshot => {
      const { stripeId } = snapshot.data()
      if (!stripeId) {
        return Promise.resolve()
      }

      return stripe.customers.retrieve(stripeId)
    })
    .then(customer => {
      if (customer && customer.sources && customer.sources.data) {
        const { last4, brand } = getCCInfo(customer)
        const subscription = getSubscription(customer)

        return {
          brand,
          last4,
          cancel_at_period_end: subscription.cancel_at_period_end,
          current_period_end: subscription.current_period_end,
          status: subscription.status,
          trial_end: subscription.trial_end
        }
      }

      return null
    })
    .catch(err => {
      return Promise.reject(new functions.https.HttpsError('failed-precondition', err.message, { code: err.code }));
    })
});
