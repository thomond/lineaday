import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/functions'
import 'firebase/messaging'
import 'firebase/storage'

import { browserHasPush } from '@/util'

firebase.initializeApp({
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID
})

const plugins = {}

// database
const db = firebase.firestore()
const settings = { timestampsInSnapshots: true }
db.settings(settings)
plugins.db = db

// functions
export const addSubscription = firebase.functions().httpsCallable('addSubscription')

// messaging
let messaging
if (browserHasPush()) {
  messaging = firebase.messaging()
  messaging.usePublicVapidKey(process.env.VUE_APP_FIREBASE_VAPID_KEY)
}

plugins.messaging = messaging

// storage
plugins.storage = firebase.storage()

export default firebase

export { plugins }
