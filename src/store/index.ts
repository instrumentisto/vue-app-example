import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import Users from 'store/modules/Users';

Vue.use(Vuex);

const state = {
    loading: false,
};

const store = new Vuex.Store({
    state,
    modules: {
        users: Users.getModule(),
    },
    plugins: [createPersistedState({
        key: 'vue-app-example-vuex',
        paths: [
            'users.authorized',
        ],
    })],
});

if (module.hot) {
    module.hot.accept(['./modules/Users'], (updatedDependencies) => {
        const newModuleUsers = require('./modules/Users').default;
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
