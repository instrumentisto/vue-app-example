/** @module store/modules/users/getters */

import { GetterTree } from 'vuex';

import UserState from 'store/modules/user/state';
import RootState from 'store/root/state';

/**
 * The name of authorized getter.
 *
 * @type {string}
 */
export const AUTHORIZED = 'AUTHORIZED';

/**
 * The name of total count getter.
 *
 * @type {string}
 */
export const TOTAL_COUNT = 'TOTAL_COUNT';

export default {
    /**
     * Returns authorized state from users store.
     *
     * @param {UserState} state     User Vuex state.
     *
     * @returns {Object|null}    Authorized user object.
     */
    [AUTHORIZED]: (state: UserState) => {
        return state.authorized;
    },
    /**
     * Returns total users count state from users store.
     *
     * @param {UserState} state     User Vuex state.
     *
     * @returns {number}    Number of users in state.
     */
    [TOTAL_COUNT]: (state: UserState) => {
        return state.all.length;
    },
} as GetterTree<UserState, RootState>;
