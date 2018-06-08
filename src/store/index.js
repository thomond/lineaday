import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

import auth from './auth'
import lines from './lines'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  state: {

  },
  modules: {
    auth,
    lines
  },
  mutations: {

  },
  plugins: debug ? [createLogger()] : [],
  actions: {

  }
})
