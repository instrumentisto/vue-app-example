import Vue from 'vue';
import Vuex, { ActionTree, GetterTree, MutationTree } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import UserModule from 'store/modules/user';
import actions from 'store/root/actions';
import getters from 'store/root/getters';
import mutations from 'store/root/mutations';
import RootState from 'store/root/state';

Vue.use(Vuex);

const store = new Vuex.Store({
    actions,
    getters,
    modules: {
        user: new UserModule(),
    },
    mutations,
    plugins: [createPersistedState({
        key: 'vue-app-example-vuex',
        paths: [
            'user.authorized',
            'locale',
        ],
    })],
    state: new RootState(),
});

if (module.hot) {
    module.hot.accept([
        'store/root/actions',
        'store/root/getters',
        'store/root/mutations',
        'store/modules/user',
    ], (updatedDependencies) => {
        // console.log('store hot updated!');
        const HotUserModule = require('store/modules/user').default;
        store.hotUpdate({
            actions: require('store/root/actions') as ActionTree<RootState, any>,
            getters: require('store/root/getters') as GetterTree<RootState, any>,
            modules: {
                users: new HotUserModule(),
            },
            mutations: require('store/root/mutations') as MutationTree<RootState>,
        });
    });

    module.hot.dispose(() => {
        // console.log('store hot disposed!');
    });
}

export default store;
