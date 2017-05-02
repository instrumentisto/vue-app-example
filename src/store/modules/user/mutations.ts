/** @module store/modules/users/mutations */

import { MutationTree } from 'vuex';

import UserState from 'store/modules/user/state';

/**
 * The name of add user mutation.
 *
 * @type {string}
 */
export const ADD = 'ADD';

/**
 * The name of set user authorization mutation.
 *
 * @type {string}
 */
export const SET_AUTHORIZED = 'SET_AUTHORIZED';

/**
 * The name of set users list mutation.
 *
 * @type {string}
 */
export const SET_LIST = 'SET_LIST';

export default {
    /**
     * Add given user to all users state.
     *
     * @param {UserState] state     User Vuex state.
     * @param user                  User, that will be added.
     */
    [ADD]: (state: UserState, user) => {
        state.all.push(user);
    },
    /**
     * Sets user authorization state.
     *
     * @param {UserState} state     User Vuex state.
     * @param {object|null} user    User object, that will be set as
     *                              authorization info. It also can be null,
     *                              then authorization state will be reset.
     */
    [SET_AUTHORIZED]: (state: UserState, user) => {
        if (user && user.password) {
            delete user.password;
        }
        state.authorized = user;
    },
    /**
     * Sets list of all users in the state.
     * Note, that this action will replace already existing users in list.
     *
     * @param {UserState} state     User Vuex state.
     * @param {object[]} users      Array of users, that will be set as users
     *                              list in the state.
     */
    [SET_LIST]: (state: UserState, users) => {
        state.all = users;
    },
} as MutationTree<UserState>;
