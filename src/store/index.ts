import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import users from './modules/users.ts'

Vue.use(Vuex)

const state = {
    loading: false,
}

export default new Vuex.Store({
    state,
    modules: {
        users
    },
    plugins: [createPersistedState({
        key: 'vue-app-example-vuex',
        paths: [
            'users.authorized'
        ]
    })]
})
