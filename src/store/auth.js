import get from 'lodash/get'
import omitBy from 'lodash/omitBy'
import router from '@/router'
import firebase, { plugins } from '@/firebase'
import { defaultReminderTime, displayError, displayMessage } from '@/util'

const initialState = {
  blockedInBrowser: false,
  loading: false,
  settings: {
    reminderTime: defaultReminderTime,
  },
  user: null
}

const actions = {
  async onUserLogin({ commit, dispatch, state }, authUser) {
    try {
      commit('setUser', authUser)
      await dispatch('getUserSettings')

      // user hasn't explicitly turned off notifications
      if (state.settings.sendNotifications === true) {
        dispatch('requestMessagingPermission')
      } else if (state.settings.sendNotifications === undefined) {
        commit('toggleNotificationBanner', true)
      }
    } catch (err) {
      displayError(err)
    }
  },
  async getUserSettings({ commit, state }) {
    // const waiter = 'get user settings'
    // dispatch('wait/start', waiter, { root: true })
    const doc = await plugins.db
      .collection('users')
      .doc(state.user.uid)
      .get()

    const { reminderTime, sendNotifications } = doc.data()
    commit('modifyUserSettings', { reminderTime, sendNotifications })
    // dispatch('wait/end', waiter, { root: true })
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
    commit('setLoading', true)
    try {
      await dispatch('updateUser', { sendNotifications, reminderTime })
      displayMessage('Notification settings updated!')
    } catch (err) {
      displayError(err)
    }
    commit('setLoading', false)
  },
  async userEmailSignIn({ dispatch }, { email, password }) {
    try {
      const doc = await firebase.auth().signInWithEmailAndPassword(email, password)
      dispatch('onUserLogin', doc.user)
      router.push('/home')
    } catch (err) {
      displayError(err)
    }
  },
  async userEmailSignUp({ commit, dispatch }, { email, password }) {
    try {
      const doc = await firebase.auth().createUserWithEmailAndPassword(email, password)
      commit('setUser', doc.user)
      commit('toggleNotificationBanner')
      dispatch('updateUser', { reminderTime: defaultReminderTime })
      router.push('/home')
    } catch (err) {
      displayError(err)
    }
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
  isAuthenticated: state => !!state.user,
  userEmail: state => get(state, 'user.email', ''),
  userIsLoading: state => state.loading,
  userSettings: state => state.settings
}

const mutations = {
  modifyUserSettings(state, attributes) {
    const nonEmptyAttributes = omitBy(attributes, attribute => attribute === undefined)
    state.settings = { ...state.settings, ...nonEmptyAttributes }
  },
  resetUser(state) {
    state.blockedInBrowser = false
    state.settings = {}
    state.user = null
  },
  setBlockedInBrowser(state, blockedInBrowser) {
    state.blockedInBrowser = blockedInBrowser
  },
  setLoading(state, isLoading) {
    state.loading = isLoading
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
