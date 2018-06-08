import { Toast } from 'buefy'
import get from 'lodash/get'
import router from '@/router'
import firebase, { db } from '@/firebase'

const initialState = {
  data: null,
  loading: false,
  user: null
}

const actions = {
  async getUserFromAuthUser({ commit }, authUser) {
    try {
      const doc = await db.collection('users').doc(authUser.uid).get()
      const data = doc.data()
      commit('setUser', authUser)
      commit('setData', data)
    } catch (err) {
      Toast.open({
        message: err.message,
        position: 'is-bottom',
        type: 'is-danger',
        duration: 6000,
      })
    }
  },
  async userEmailSignIn({ commit, dispatch }, { email, password }) {
    commit('setLoading', true)
    try {
      const authUser = await firebase.auth().signInWithEmailAndPassword(email, password)
      dispatch('getUserFromAuthUser', authUser)
      router.push('/')
    } catch (error) {
      Toast.open({
        message: error.message,
        position: 'is-bottom',
        type: 'is-danger',
        duration: 6000,
      })
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
    } catch (error) {
      Toast.open({
        message: error.message,
        position: 'is-bottom',
        type: 'is-danger',
        duration: 6000,
      })
    }
    commit('setLoading', false)
  },
  userSignOut({ commit }) {
    firebase.auth().signOut()
    commit('setUser', null)
    router.push('/signin')
  }
}

const getters = {
  lines: state => get(state, 'data.lines', []),
  loading: state => state.loading,
  isAuthenticated(state) {
    return !!state.user
  }
}

const mutations = {
  setData(state, payload) {
    state.data = payload
  },
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
