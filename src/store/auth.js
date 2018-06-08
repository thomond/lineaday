import { Toast } from 'buefy'
import router from '@/router'
import firebase, { db } from '@/firebase'

const initialState = {
  lines: [],
  loading: false,
  user: null
}

function collectionQuerySnapshotToArray(snapshot) {
  const docs = []
  snapshot.forEach(doc => docs.push(doc.data()))
  return docs
}

function displayError(err) {
  Toast.open({
    message: err.message,
    position: 'is-bottom',
    type: 'is-danger',
    duration: 6000,
  })
}

const actions = {
  async addLine({ commit, state }, text) {
    const createdAt = new Date()
    const line = { text, createdAt }
    try {
      await db.collection('users').doc(state.user.uid).collection('lines').add(line)
      commit('addLine', line)
      router.push('/list')
    } catch (err) {
      displayError(err)
    }
  },
  async getUserFromAuthUser({ commit }, authUser) {
    try {
      const snapshot = await db
        .collection('users')
        .doc(authUser.uid)
        .collection('lines')
        .orderBy('createdAt', 'desc')
        .get()
      const data = collectionQuerySnapshotToArray(snapshot)
      commit('setUser', authUser)
      commit('setLines', data)
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
    router.push('/signin')
  }
}

const getters = {
  lines: state => state.lines,
  loading: state => state.loading,
  isAuthenticated(state) {
    return !!state.user
  }
}

const mutations = {
  addLine(state, line) {
    state.lines.unshift(line)
  },
  setLines(state, payload) {
    state.lines = payload
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
