import moment from 'moment'
import { db } from '@/firebase'

import { displayError } from './util'

const initialState = {
  hasToday: false,
  lines: [],
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

const waiter = 'loading lines'

const actions = {
  async addLine({ commit, dispatch, rootState }, text) {
    dispatch('wait/start', waiter, { root: true });
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
    dispatch('wait/end', waiter, { root: true });
  },
  async getLines({ commit, dispatch }, user) {
    dispatch('wait/start', waiter, { root: true });
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
    dispatch('wait/end', waiter, { root: true });
  },
  resetLines({ commit }) {
    commit('setLines', null)
    commit('setHasToday', true)
  }
}

const getters = {
  hasToday: state => state.hasToday,
  lines: state => state.lines,
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
