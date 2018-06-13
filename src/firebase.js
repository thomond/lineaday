import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/messaging'

firebase.initializeApp({
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID
})

// database
export const db = firebase.firestore()
const settings = { timestampsInSnapshots: true }
db.settings(settings)

// messaging
const messaging = firebase.messaging()
messaging.usePublicVapidKey(process.env.VUE_APP_FIREBASE_VAPID_KEY)


messaging.requestPermission().then(() => {
  console.log('Notification permission granted.');
  // TODO(developer): Retrieve an Instance ID token for use with FCM.
  // ...
}).catch((err) => {
  console.log('Unable to get permission to notify.', err);
});

export default firebase
