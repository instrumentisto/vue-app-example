import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import users from '~store/modules/users';

Vue.use(Vuex);

const state = {
    loading: false,
};

const store = new Vuex.Store({
    state,
    modules: {
        users,
    },
    plugins: [createPersistedState({
        key: 'vue-app-example-vuex',
        paths: [
            'users.authorized',
        ],
    })],
});

if (module.hot) {
    module.hot.accept(['./modules/users'], (updatedDependencies) => {
        const newModuleUsers = require('./modules/users').default;
        store.hotUpdate({
            modules: {
                users: newModuleUsers,
            },
        });
    });

    module.hot.dispose(() => {
        // console.log('dispose store');
    });
}

export default store;
