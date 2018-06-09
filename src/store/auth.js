import get from 'lodash/get'
import router from '@/router'
import firebase from '@/firebase'

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
