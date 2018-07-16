const functions = require('firebase-functions')
const admin = require('./init')

const { stripe, getCCInfo } = require('./stripeUtils')

const addSubscription = functions.https.onCall((data, context) => {
  const { coupon, stripeToken, stripePlan } = data

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

  let uppercaseCoupon
  if (coupon) {
    uppercaseCoupon = coupon.toUpperCase()
  }
  const response = {}

  return admin.firestore().collection('users').doc(uid).get()
    .then(snapshot => {
      const user = snapshot.data()
      if (user.stripeId) {
        return stripe.customers.update(user.stripeId, { source: stripeToken })
      }

      return stripe.customers.create({
        email: user.email,
        source: stripeToken
      })
    })
    .then(customer => {
      const { last4, brand } = getCCInfo(customer)
      response.last4 = last4
      response.brand = brand

      const existingUser = !!customer.subscriptions.data.length

      return stripe.subscriptions.create({
        coupon: uppercaseCoupon,
        customer: customer.id,
        items: [{
          plan: stripePlan
        }],
        trial_from_plan: existingUser
      })
    })
    .then(subscription => {
      const {
        customer,
        status,
        trial_end
      } = subscription
      response.status = status
      response.trial_end = trial_end

      return admin.firestore()
        .collection('users')
        .doc(uid)
        .set({ stripeId: customer }, { merge: true })
    })
    .then(() => {
      return response
    })
    .catch(err => {
      return Promise.reject(new functions.https.HttpsError('failed-precondition', err.message, { code: err.code }));
    })
});

module.exports = addSubscription

