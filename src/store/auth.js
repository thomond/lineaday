import axios from 'axios'
import get from 'lodash/get'
import omitBy from 'lodash/omitBy'
import router from '@/router'
import firebase, { plugins } from '@/firebase'
import bugsnagClient from '@/bugsnag'
import { defaultReminderTime, displayError, displayMessage } from '@/util'

const initialState = {
  blockedInBrowser: false,
  encryptionKey: null,
  loading: 0,
  settings: {
    reminderTime: defaultReminderTime,
    subscription: false,
  },
  user: null
}

const actions = {
  async onUserLogin({ commit, dispatch, state }, authUser) {
    commit('incrementUserLoading')
    try {
      commit('setUser', authUser)
      await dispatch('getUserSettings')
      await dispatch('getEncryptionKey')
      // user hasn't explicitly turned off notifications
      if (state.settings.sendNotifications === true) {
        dispatch('requestMessagingPermission')
      } else if (state.settings.sendNotifications === undefined) {
        commit('toggleNotificationBanner', true)
      }
    } catch (err) {
      bugsnagClient.notify(err)
      displayError(err)
    }
    commit('decrementUserLoading')
  },
  async getEncryptionKey({ commit }) {
    try {
      const { claims } = await firebase.auth().currentUser.getIdTokenResult()
      commit('setEncryptionKey', claims.encryptionKey)
    } catch (err) {
      bugsnagClient.notify(err)
      console.log(err)
    }
  },
  async getUserSettings({ commit, state }) {
    const doc = await plugins.db
      .collection('users')
      .doc(state.user.uid)
      .get()

    const data = doc.data()

    if (data) {
      const { reminderTime, sendNotifications, subscription } = data
      commit('modifyUserSettings', { reminderTime, sendNotifications, subscription })
    }
  },
  async requestMessagingPermission({ commit, dispatch }, { notify = false } = {}) {
    try {
      await plugins.messaging.requestPermission()
      dispatch('setMessagingToken')
      plugins.messaging.onTokenRefresh(() => {
        dispatch('setMessagingToken')
      })

      if (notify) {
        displayMessage('Successfully subscribed to notifications!')
      }
    } catch (err) {
      commit('setBlockedInBrowser', true)
      console.log('Unable to get permission to notify.', err)
    }
  },
  async setMessagingToken({ dispatch }) {
    let messagingTokens = null
    try {
      const messagingToken = await plugins.messaging.getToken()
      messagingTokens = { [messagingToken]: true }
    } catch (err) {
      console.log('Unable to get permission to notify.', err)
      displayError(err)
    }
    dispatch('updateUser', {
      messagingTokens,
      sendNotifications: !!messagingTokens
    })
  },
  async updateUser({ commit, state }, attributes) {
    const nonEmptyAttributes = omitBy(attributes, attribute => attribute === undefined)
    await plugins.db
      .collection('users')
      .doc(state.user.uid)
      .set(nonEmptyAttributes, { merge: true })
    commit('modifyUserSettings', nonEmptyAttributes)
  },
  async updateUserSettings({ commit, dispatch }, { sendNotifications, reminderTime }) {
    commit('incrementUserLoading')
    try {
      await dispatch('updateUser', { sendNotifications, reminderTime })
      displayMessage('Notification settings updated!')
    } catch (err) {
      bugsnagClient.notify(err)
      displayError(err)
    }
    commit('decrementUserLoading')
  },
  async userEmailSignIn({ commit, dispatch }, { user: { email, password }, line }) {
    commit('incrementUserLoading')
    try {
      const doc = await firebase.auth().signInWithEmailAndPassword(email, password)
      await dispatch('onUserLogin', doc.user)
      if (line) {
        await dispatch('addLine', line)
      }
      router.push('/home')
    } catch (err) {
      bugsnagClient.notify(err)
      displayError(err)
    }
    commit('decrementUserLoading')
  },
  async userEmailSignUp({ commit, dispatch }, { user: { email, password }, line }) {
    commit('incrementUserLoading')
    try {
      const doc = await firebase.auth().createUserWithEmailAndPassword(email, password)
      const idToken = await doc.user.getIdToken()
      const { data } = await axios.post(`${process.env.VUE_APP_API_URL}/setEncryptionKey`, {
        data: {
          idToken
        }
      })
      firebase.auth().currentUser.getIdToken(true)
      commit('setEncryptionKey', data.encryptionKey)
      commit('setUser', doc.user)
      commit('toggleNotificationBanner', true)
      dispatch('updateUser', { reminderTime: defaultReminderTime })
      if (line) {
        await dispatch('addLine', line)
      }
      router.push('/home')
    } catch (err) {
      bugsnagClient.notify(err)
      displayError(err)
    }
    commit('decrementUserLoading')
  },
  async userSignOut({ commit }) {
    await firebase.auth().signOut()
    commit('resetUser')
    commit('resetLines')
    commit('toggleNotificationBanner', false)
    router.push('/login')
  }
}

const getters = {
  blockedInBrowser: state => state.blockedInBrowser,
  encryptionKey: state => state.encryptionKey,
  isAuthenticated: state => !!state.user,
  userEmail: state => get(state, 'user.email', ''),
  userIsLoading: state => state.loading > 0,
  userSettings: state => state.settings
}

const mutations = {
  modifyUserSettings(state, attributes) {
    const nonEmptyAttributes = omitBy(attributes, attribute => attribute === undefined)
    state.settings = { ...state.settings, ...nonEmptyAttributes }
  },
  resetUser(state) {
    state.blockedInBrowser = false
    state.encryptionKey = null
    state.settings = {}
    state.user = null
  },
  setBlockedInBrowser(state, blockedInBrowser) {
    state.blockedInBrowser = blockedInBrowser
  },
  setEncryptionKey(state, key) {
    state.encryptionKey = key
  },
  incrementUserLoading(state) {
    state.loading += 1
  },
  decrementUserLoading(state) {
    state.loading -= 1
  },
  setUser(state, { uid, email }) {
    bugsnagClient.user = { uid, email }
    state.user = { uid, email }
  }
}

export default {
  state: initialState,
  actions,
  getters,
  mutations
}
