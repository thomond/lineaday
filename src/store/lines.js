import moment from 'moment'
import get from 'lodash/get'
import { db } from '@/firebase'

import { displayError } from './util'

const initialState = {
  hasToday: false,
  lines: [],
}

const groupByDateFormat = 'MMMM DD'

function getIndexOfToday(lineArray) {
  const today = moment().format(groupByDateFormat)
  return lineArray.findIndex(([key]) => key === today)
}

function getLineArray(lines) {
  const today = moment().format(groupByDateFormat)
  const lineArray = Object.entries(lines)
  if (lines[today] && lines[today].length) {
    const indexOfToday = getIndexOfToday(lineArray)
    if (indexOfToday > 0) {
      return [...lineArray.slice(indexOfToday), ...lineArray.slice(0, indexOfToday - 1)]
    }
  }

  return lineArray
}

function formatLineCollectionSnapshot(snapshot) {
  const today = moment()
  const lines = {}
  let hasToday = false

  snapshot.forEach((doc) => {
    const data = doc.data()
    const date = moment(data.createdAt.toDate()).format(groupByDateFormat)
    if (lines[date]) {
      lines[date].push(data)
    } else {
      lines[date] = [data]
    }
    if (today.isSame(moment(data.createdAt.toDate()), 'd')) {
      hasToday = true
    }
  })

  const lineArray = getLineArray(lines)
  return { lines: lineArray, hasToday }
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
      const { hasToday, lines } = formatLineCollectionSnapshot(snapshot)
      commit('setHasToday', hasToday)
      commit('setLines', lines)
    } catch (err) {
      displayError(err)
    }
    dispatch('wait/end', waiter, { root: true });
  },
  resetLines({ commit }) {
    commit('setLines', {})
    commit('setHasToday', false)
  }
}

const getters = {
  hasToday: state => state.hasToday,
  lines: state => state.lines
}

const mutations = {
  addLine(state, line) {
    const date = moment(line.createdAt).format(groupByDateFormat)
    if (get(state.lines, '[0][0]') === date) {
      state.lines[0][1].unshift(line)
    } else {
      state.lines.unshift([date, [line]])
    }
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
