import router from '@/router'
import firebase, { db } from '@/firebase'

import { displayError } from './util'

const initialState = {
  loading: false,
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
  async userEmailSignIn({ commit, dispatch }, { email, password }) {
    commit('setLoading', true)
    try {
      const authUser = await firebase.auth().signInWithEmailAndPassword(email, password)
      dispatch('getUserFromAuthUser', authUser)
      router.push('/')
    } catch (err) {
      displayError(err)
    }
    commit('setLoading', false)
  },
  async userEmailSignUp({ commit }, { email, password }) {
    commit('setLoading', true)
    try {
      const authUser = await firebase.auth().createUserWithEmailAndPassword(email, password)
      db.collection('users').doc(authUser.uid).set(authUser)
      commit('setUser', authUser)
      router.push('/')
    } catch (err) {
      displayError(err)
    }
    commit('setLoading', false)
  },
  userSignOut({ commit }) {
    firebase.auth().signOut()
    commit('setUser', null)
    router.push('/login')
  }
}

const getters = {
  authLoading: state => state.loading,
  isAuthenticated(state) {
    return !!state.user
  }
}

const mutations = {
  setUser(state, payload) {
    state.user = payload
  },
  setLoading(state, payload) {
    state.loading = payload
  }
}

export default {
  state: initialState,
  actions,
  getters,
  mutations
}
