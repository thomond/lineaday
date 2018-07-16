const functions = require('firebase-functions')
const admin = require('./init')

const { hasImageThisMonth } = require('./stripeUtils')

module.exports = functions.firestore
  .document('users/{userId}/lines/{lineId}')
  .onWrite((change, context) => {
    const newDocument = change.after.data()
    const oldDocument = change.before.exists ? change.before.data() : null
    const userRef = admin.firestore().collection('users').doc(context.params.userId)

    const userParams = {
      lastPostDate: newDocument.createdAt
    }

    return userRef.get()
      .then(userSnapshot => {
        const user = userSnapshot.data()

        if (newDocument.imageUrl) {
          if (!oldDocument || !oldDocument.imageUrl) {
            console.log('this is a new post')
            // if new has an image and old does not (or does not exist)
            userParams.penultimateImageDate = user.lastImageDate
            userParams.lastImageDate = newDocument.createdAt

            if (user.lastImageDate && hasImageThisMonth(user, newDocument)) {
              console.log('user has an image this month')
              userParams.imageCount = user.imageCount + 1
            } else {
              console.log('resetting count for this month')
              userParams.imageCount = 1
            }
            // both have an image... do nothing
          }
        } else if (oldDocument.imageUrl) {
          console.log('user removed image')
          // if old has an image and new does not we've removed the image
          userParams.lastImageDate = user.penultimateImageDate
          userParams.penultimateImageDate = null

          if (hasImageThisMonth(user, oldDocument)) {
            console.log('user has an image this month')
            userParams.imageCount = user.imageCount - 1
          } else {
            console.log('resetting count')
            userParams.imageCount = 0
          }
        } else if (oldDocument) {
          // neither has an image. do nothing.
          console.log('nothing changed')
          return null
        }

        console.log('userparams: ', userParams)
        return userRef.set(userParams, { merge: true })
    })
  })
