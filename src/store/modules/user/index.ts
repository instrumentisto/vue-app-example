import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';

import actions from 'store/modules/user/actions';
import getters from 'store/modules/user/getters';
import mutations from 'store/modules/user/mutations';
import UserState from 'store/modules/user/state';
import RootState from 'store/root/state';

/**
 * Represents user Vuex store module and implements its own state, getters,
 * actions and mutations.
 */
export default class User implements Module<UserState, RootState> {

    /**
     * Specifies if module is self-contained or registered
     * under the global namespace.
     *
     * More info: https://vuex.vuejs.org/en/modules.html ("Namespacing" section)
     */
    public namespaced: boolean = true;

    /**
     * Specifies user module level state.
     */
    public state: UserState;

    /**
     * Specifies getters of user module.
     */
    public getters: GetterTree<UserState, RootState> = getters;

    /**
     * Specifies actions of user module.
     */
    public actions: ActionTree<UserState, RootState> = actions;

    /**
     * Specifies mutations of user module.
     */
    public mutations: MutationTree<UserState> = mutations;

    /**
     * Creates user Vuex module, based on predefined class properties.
     */
    public constructor() {
        this.state = new UserState();
    }
}
