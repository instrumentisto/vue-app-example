import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import Users from 'store/modules/Users';

export default class Root {
    public static init() {
        Vue.use(Vuex);

        const state = {
            loading: false,
        };

        return new Vuex.Store({
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
    }
}

if (module.hot) {
    module.hot.accept(['./modules/Users'], (updatedDependencies) => {
        const newModuleUsers = require('./modules/Users').default;
        Root.init().hotUpdate({
            modules: {
                users: newModuleUsers,
            },
        });
    });

    module.hot.dispose(() => {
        // console.log('dispose store');
    });
}
