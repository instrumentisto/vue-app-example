/** @module store/modules/users/actions */

import { ActionContext, ActionTree } from 'vuex';

import UsersApi from 'api/Users';
import * as mutations from 'store/modules/user/mutations';
import UserState from 'store/modules/user/state';
import RootState from 'store/root/state';

/**
 * The name of fetch all action.
 * @type {string}
 */
export const FETCH_ALL = 'FETCH_ALL';

/**
 * The name of login action.
 * @type {string}
 */
export const LOGIN = 'LOGIN';

/**
 * The name of reset authorization action.
 *
 * @type {string}
 */
export const RESET_AUTHORIZATION = 'RESET_AUTHORIZATION';

/**
 * The name of registration action.
 *
 * @type {string}
 */
export const SIGN_UP = 'SIGN_UP';

export default {
    /**
     * Fetches all users from API and commit them to the store.
     *
     * @param {ActionContext<UserState, RootState>} store   User Vuex store.
     *
     * @returns {Promise<any[]>}    Resolved promise with array of fetched users.
     */
    [FETCH_ALL]: (store: ActionContext<UserState, RootState>) => {
        return UsersApi.getAll().then((users) => {
            store.commit(mutations.SET_LIST, users);
            return users;
        });
    },
    /**
     * Call API login action and commit authorized user to the store.
     *
     * @param {ActionContext} store     User Vuex store.
     * @param {string} email            Email of the user, that is signing in.
     * @param {string} password         Password of the user, that is signing in.
     *
     * @returns {Promise<any>}   Resolved promise with authorized user object,
     *                           or rejected promise with error code:
     *                           - 1: if user with given email/password
     *                           doesn't exist.
     */
    [LOGIN]: (store: ActionContext<UserState, RootState>, email, password) => {
        return UsersApi.login(email, password).then((user) => {
            store.commit(mutations.SET_AUTHORIZED, user);
            return user;
        });
    },
    /**
     * Resets user authorization info in the store by committing null.
     *
     * @param {ActionContext<UserState, RootState>} store   User Vuex store.
     */
    [RESET_AUTHORIZATION]: (store: ActionContext<UserState, RootState>) => {
        store.commit(mutations.SET_AUTHORIZED, null);
    },
    /**
     * Call API register action and commit created user to the store.
     *
     * @param {ActionContext} store     User Vuex store.
     * @param user                      User object with all required info for
     *                                  registration.
     *
     * @returns {Promise<any>}   Resolved promise with new created user object,
     *                           or rejected promise with error code:
     *                           - 1: if user with given email is already exists.
     */
    [SIGN_UP]: (store: ActionContext<UserState, RootState>, user) => {
        return UsersApi.register(user).then((addedUser) => {
            store.commit(mutations.ADD, addedUser);
            store.commit(mutations.SET_AUTHORIZED, user);
            return addedUser;
        });
    },
} as ActionTree<UserState, RootState>;
