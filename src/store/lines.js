import moment from 'moment'
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

function hasToday(lines) {
  const today = moment()
  return (lines.filter(line => today.isSame(moment(line.createdAt.toDate()), 'd')).length > 0)
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
      commit('setHasToday', true)
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
      commit('setHasToday', hasToday(data))
      commit('setLines', data)
    } catch (err) {
      displayError(err)
    }
  }
}

const getters = {
  hasToday: state => state.hasToday,
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
