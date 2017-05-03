import { GetterTree } from 'vuex';

import UserState from 'store/modules/user/state';
import RootState from 'store/root/state';

/**
 * The name of authorized getter.
 */
export const AUTHORIZED: string = 'authorized';

/**
 * The name of total count getter.
 */
export const TOTAL_COUNT: string = 'totalCount';

/**
 * Returns authorized state from users store.
 *
 * @param state     User Vuex state.
 *
 * @returns     Authorized user object.
 */
export function authorized(state: UserState) {
    return state.authorized;
}

/**
 * Returns total users count state from users store.
 *
 * @param state     User Vuex state.
 *
 * @returns     Number of users in state.
 */
export function totalCount(state: UserState) {
    return state.all.length;
}

export default {
    authorized,
    totalCount
} as GetterTree<UserState, RootState>;
