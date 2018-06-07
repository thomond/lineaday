import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

import auth from './auth'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  state: {

  },
  modules: {
    auth,
  },
  mutations: {

  },
  plugins: debug ? [createLogger()] : [],
  actions: {

  }
})
