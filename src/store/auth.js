import get from 'lodash/get'
import router from '@/router'
import firebase, { db, messaging } from '@/firebase'
import { displayError, displayMessage, hourToUTC } from '@/util'

const initialState = {
  user: null
}

const actions = {
  async getUserFromAuthUser({ commit, dispatch }, authUser) {
    try {
      commit('setUser', authUser)
      dispatch('requestMessagingPermission')
    } catch (err) {
      displayError(err)
    }
  },
  async requestMessagingPermission({ dispatch }) {
    try {
      await messaging.requestPermission()
      dispatch('setMessagingToken')
      messaging.onTokenRefresh(() => {
        dispatch('setMessagingToken')
      })
    } catch (err) {
      console.log('Unable to get permission to notify.', err)
      displayMessage('You can turn notifications on in user settings.')
    }
  },
  async setMessagingToken({ dispatch }) {
    let messagingToken = null
    try {
      messagingToken = await messaging.getToken()
      console.log('token: ', messagingToken)
      messaging.onMessage((payload) => {
        console.log('Message received. ', payload);
        // ...
      });
    } catch (err) {
      console.log('Unable to get permission to notify.', err)
      displayError(err)
    }
    dispatch('updateUser', {
      messagingTokens: { [messagingToken]: true },
      sendNotifications: true
    })
  },
  async updateUser({ commit, state }, attributes) {
    await db
      .collection('users')
      .doc(state.user.uid)
      .set(attributes, { merge: true })
    commit('modifyUser', attributes)
  },
  async updateUserSettings({ dispatch }, { sendNotifications, reminderTime }) {
    const hour = hourToUTC(reminderTime)
    dispatch('updateUser', { sendNotifications, reminderTime: hour })
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
  async userSignOut({ commit, dispatch }) {
    await firebase.auth().signOut()
    commit('setUser', null)
    dispatch('resetLines')
    router.push('/login')
  }
}

const getters = {
  isAuthenticated: state => !!state.user,
  userEmail: state => get(state, 'user.email', '')
}

const mutations = {
  modifyUser(state, attributes) {
    state.user = { ...state.user, attributes }
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
