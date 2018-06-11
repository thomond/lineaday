import moment from 'moment'
import get from 'lodash/get'
import uniq from 'lodash/uniq'
import { db } from '@/firebase'
import { displayError } from '@/util'

const initialState = {
  hasToday: false,
  lines: [],
  tags: []
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
      return [...lineArray.slice(indexOfToday), ...lineArray.slice(0, indexOfToday)]
    }
  }

  return lineArray
}

function formatLineCollectionSnapshot(snapshot) {
  const today = moment()
  const lines = {}
  const tags = []
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

    tags.push(...Object.keys(data.tags || {}))
  })

  const lineArray = getLineArray(lines)
  return { lines: lineArray, hasToday, tags }
}

const waiter = 'loading lines'

const actions = {
  async addLine({ commit, dispatch, rootState }, { text, tags }) {
    dispatch('wait/start', waiter, { root: true });
    const today = moment()
    const tagObject = tags.reduce((acc, curr) => {
      acc[curr] = today.valueOf()
      return acc
    }, {})
    const line = {
      createdAt: today.toDate(),
      dayOfWeek: today.day(),
      ...today.toObject(),
      tags: tagObject,
      text,
    }
    try {
      await db
        .collection('users')
        .doc(rootState.auth.user.uid)
        .collection('lines')
        .add(line)
      commit('addLine', line)
      commit('addTags', tags)
      commit('setHasToday', true)
    } catch (err) {
      displayError(err)
    }
    dispatch('wait/end', waiter, { root: true });
  },
  async getLines({ commit, dispatch, rootState }, { tag }) {
    const { user } = rootState.auth
    dispatch('wait/start', waiter, { root: true });
    try {
      let snapshotPromise = db
        .collection('users')
        .doc(user.uid)
        .collection('lines')

      if (tag) {
        snapshotPromise = snapshotPromise
          .where(`tags.${tag}`, '>', 0)
          .orderBy(`tags.${tag}`, 'desc')
      } else {
        snapshotPromise = snapshotPromise
          .orderBy('createdAt', 'desc')
      }

      const snapshot = await snapshotPromise.get()

      const { hasToday, lines, tags } = formatLineCollectionSnapshot(snapshot)
      commit('setHasToday', hasToday)
      commit('setLines', lines)
      commit('setTags', tags)
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
  lines: state => state.lines,
  tags: state => state.tags
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
  addTags(state, tags) {
    state.tags = uniq(state.tags.concat(tags)).sort()
  },
  setHasToday(state, payload) {
    state.hasToday = payload
  },
  setLines(state, payload) {
    state.lines = payload
  },
  setTags(state, tags) {
    state.tags = uniq(tags).sort()
  },
}

export default {
  state: initialState,
  actions,
  getters,
  mutations
}
