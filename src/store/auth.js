import get from 'lodash/get'
import router from '@/router'
import firebase, { db, messaging } from '@/firebase'
import { displayError, displayMessage } from '@/util'

const initialState = {
  blockedInBrowser: false,
  settings: {
    reminderTime: 16,
    sendNotifications: false,
  },
  user: null
}

const waiter = 'user update'

const actions = {
  async getUserFromAuthUser({ commit, dispatch }, authUser) {
    try {
      commit('setUser', authUser)
      dispatch('requestMessagingPermission')
    } catch (err) {
      displayError(err)
    }
  },
  async getUserSettings({ commit, dispatch, state }) {
    dispatch('wait/start', waiter, { root: true })
    const doc = await db
      .collection('users')
      .doc(state.user.uid)
      .get()

    const { reminderTime, sendNotifications } = doc.data()
    commit('modifyUserSettings', { reminderTime, sendNotifications })
    dispatch('wait/end', waiter, { root: true })
    return { reminderTime, sendNotifications }
  },
  async requestMessagingPermission({ commit, dispatch }) {
    try {
      await messaging.requestPermission()
      dispatch('setMessagingToken')
      messaging.onTokenRefresh(() => {
        dispatch('setMessagingToken')
      })
    } catch (err) {
      commit('setBlockedInBrowser', true)
      console.log('Unable to get permission to notify.', err)
    }
  },
  async setMessagingToken({ dispatch }) {
    let messagingTokens = null
    try {
      const messagingToken = await messaging.getToken()
      messaging.onMessage((payload) => {
        console.log('Message received. ', payload);
        // ...
      });

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
    await db
      .collection('users')
      .doc(state.user.uid)
      .set(attributes, { merge: true })
    commit('modifyUserSettings', attributes)
  },
  async updateUserSettings({ dispatch }, { sendNotifications, reminderTime }) {
    dispatch('wait/start', waiter, { root: true })
    try {
      await dispatch('updateUser', { sendNotifications, reminderTime })
      displayMessage('Notification settings updated!')
    } catch (err) {
      displayError(err)
    }
    dispatch('wait/end', waiter, { root: true })
  },
  async userEmailSignIn({ dispatch }, { email, password }) {
    try {
      const doc = await firebase.auth().signInWithEmailAndPassword(email, password)
      dispatch('getUserFromAuthUser', doc.user)
      router.push('/home')
    } catch (err) {
      displayError(err)
    }
  },
  async userEmailSignUp({ commit }, { email, password }) {
    try {
      const doc = await firebase.auth().createUserWithEmailAndPassword(email, password)
      commit('setUser', doc.user)
      router.push('/home')
    } catch (err) {
      displayError(err)
    }
  },
  async userSignOut({ commit }) {
    await firebase.auth().signOut()
    commit('resetUser')
    commit('resetLines')
    router.push('/login')
  }
}

const getters = {
  blockedInBrowser: state => state.blockedInBrowser,
  isAuthenticated: state => !!state.user,
  userEmail: state => get(state, 'user.email', ''),
  userSettings: state => state.settings
}

const mutations = {
  setBlockedInBrowser(state, blockedInBrowser) {
    state.blockedInBrowser = blockedInBrowser
  },
  modifyUserSettings(state, { sendNotifications, reminderTime }) {
    state.settings = { ...state.settings, sendNotifications, reminderTime }
  },
  resetUser(state) {
    state.user = null
  },
  setUser(state, payload) {
    state.user = payload
  }
}

export default {
  state: initialState,
  actions,
  getters,
  mutations
}
