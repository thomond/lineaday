import router from '@/router'
import firebase, { db } from '@/firebase'

import { displayError } from './util'

const initialState = {
  user: null
}

const actions = {
  async getUserFromAuthUser({ commit, dispatch }, authUser) {
    try {
      commit('setUser', authUser)
      dispatch('getLines', authUser)
    } catch (err) {
      displayError(err)
    }
  },
  async userEmailSignIn({ dispatch }, { email, password }) {
    try {
      const doc = await firebase.auth().signInWithEmailAndPassword(email, password)
      dispatch('getUserFromAuthUser', doc.user)
      router.push('/')
    } catch (err) {
      displayError(err)
    }
  },
  async userEmailSignUp({ commit }, { email, password }) {
    try {
      const authUser = await firebase.auth().createUserWithEmailAndPassword(email, password)
      db.collection('users').doc(authUser.uid).set(authUser)
      commit('setUser', authUser)
      router.push('/')
    } catch (err) {
      displayError(err)
    }
  },
  async userSignOut({ commit }) {
    await firebase.auth().signOut()
    commit('setUser', null)
    router.push('/login')
  }
}

const getters = {
  isAuthenticated(state) {
    return !!state.user
  }
}

const mutations = {
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
