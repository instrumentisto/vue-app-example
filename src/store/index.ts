import Vue from 'vue'
import Vuex from 'vuex'
import users from './users.ts'
// import plugins from './plugins.ts'
// import createLogger from '../../../src/plugins/logger'

Vue.use(Vuex)

// const debug = process.env.NODE_ENV !== 'production'

const state = {
    loading: false
}

export default new Vuex.Store({
  state,
  modules: {
      users
  },
  // plugins
  // strict: debug,
  // plugins: debug ? [createLogger()] : []
})
