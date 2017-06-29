import { MutationTree } from 'vuex';

import UserState from 'store/modules/user/state';


/**
 * The name of add user mutation.
 */
export const ADD: string = 'add';

/**
 * The name of set user authorization mutation.
 */
export const SET_AUTHORIZED: string = 'setAuthorized';

/**
 * The name of set users list mutation.
 */
export const SET_LIST: string = 'setList';

/**
 * Add given user to all users state.
 *
 * @param state     User Vuex state.
 * @param user      User, that will be added.
 */
export function add(state: UserState, user: object) {
    state.all.push(user);
}

/**
 * Sets user authorization state.
 *
 * @param state     User Vuex state.
 * @param user      User object, that will be set as authorization info.
 *                  It also can be null, then authorization state will be reset.
 */

export function setAuthorized(state: UserState, user) {
    if (user && user.password) {
        delete user.password;
    }
    state.authorized = user;
}

/**
 * Sets list of all users in the state.
 * Note, that this action will replace already existing users in list.
 *
 * @param state     User Vuex state.
 * @param users     Array of users, that will be set as users list in the state.
 */
export function setList(state: UserState, users) {
    state.all = users;
}

export default {
    add,
    setAuthorized,
    setList,
} as MutationTree<UserState>;
