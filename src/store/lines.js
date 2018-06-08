import { db } from '@/firebase'

import { displayError } from './util'

const initialState = {
  hasToday: false,
  lines: [],
  loading: false,
}

function collectionQuerySnapshotToArray(snapshot) {
  const docs = []
  snapshot.forEach(doc => docs.push(doc.data()))
  return docs
}

const actions = {
  async addLine({ commit, rootState }, text) {
    const createdAt = new Date()
    const line = { text, createdAt }
    try {
      await db
        .collection('users')
        .doc(rootState.auth.user.uid)
        .collection('lines')
        .add(line)
      commit('addLine', line)
    } catch (err) {
      displayError(err)
    }
  },
  async getLines({ commit }, user) {
    try {
      const snapshot = await db
        .collection('users')
        .doc(user.uid)
        .collection('lines')
        .orderBy('createdAt', 'desc')
        .get()
      const data = collectionQuerySnapshotToArray(snapshot)
      commit('setLines', data)
    } catch (err) {
      displayError(err)
    }
  }
}

const getters = {
  lines: state => state.lines,
  linesLoading: state => state.loading,
}

const mutations = {
  addLine(state, line) {
    state.lines.unshift(line)
  },
  setHasToday(state, payload) {
    state.hasToday = payload
  },
  setLines(state, payload) {
    state.lines = payload
  },
}

export default {
  state: initialState,
  actions,
  getters,
  mutations
}
