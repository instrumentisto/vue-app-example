import { Module } from 'vuex';

import actions from 'store/modules/user/actions';
import getters from 'store/modules/user/getters';
import mutations from 'store/modules/user/mutations';
import UserState from 'store/modules/user/state';
import RootState from 'store/root/state';

/**
 * Represents user Vuex store module and implements its own state, getters,
 * actions and mutations.
 *
 * @implements Module<UserState, RootState>
 */
export default class User implements Module<UserState, RootState> {

    /**
     * Specifies if module is self-contained or registered
     * under the global namespace.
     * More info: https://vuex.vuejs.org/en/modules.html ("Namespacing" section)
     *
     * @type {boolean}
     */
    public namespaced = true;

    /**
     * Specifies user module level state.
     *
     * @type {UserState}
     */
    public state: UserState;

    /**
     * Specifies getters of user module.
     *
     * @type {GetterTree<UserState, RootState>}
     */
    public getters = getters;

    /**
     * Specifies actions of user module.
     *
     * @type {ActionTree<UserState, RootState>}
     */
    public actions = actions;

    /**
     * Specifies mutations of user module.
     *
     * @type {MutationTree<UserState>}
     */
    public mutations = mutations;

    /**
     * Creates user Vuex module, based on predefined class properties.
     */
    public constructor() {
        this.state = new UserState();
    }
}
