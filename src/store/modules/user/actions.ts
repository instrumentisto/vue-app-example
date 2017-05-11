import { ActionContext, ActionTree } from 'vuex';

import UsersApi from 'api/Users';
import * as mutations from 'store/modules/user/mutations';
import UserState from 'store/modules/user/state';
import RootState from 'store/root/state';

/**
 * The name of fetch all action.
 */
export const FETCH_ALL: string = 'fetchAll';

/**
 * The name of login action.
 */
export const LOGIN: string = 'login';

/**
 * The name of reset authorization action.
 */
export const RESET_AUTHORIZATION: string = 'resetAuthorization';

/**
 * The name of registration action.
 */
export const SIGN_UP: string = 'signUp';

/**
 * Fetches all users from API and commit them to the store.
 *
 * @param store     User Vuex store.
 *
 * @return   Resolved promise with array of fetched users.
 */
export function fetchAll(
    store: ActionContext<UserState, RootState>,
): Promise<object[]> {
    return UsersApi.getAll().then((users) => {
        store.commit(mutations.SET_LIST, users);
        return users as any;
    });
}

/**
 * Call API login action and commit authorized user to the store.
 *
 * @param store     User Vuex store.
 * @param user      User info with email and password to do login action.
 *
 * @return   Resolved promise with authorized user object,
 *           or rejected promise with error code:
 *           - 1: if user with given email/password doesn't exist.
 */
export function login(
    store: ActionContext<UserState, RootState>,
    user: { email: string, password: string },
): Promise<object> {
    return UsersApi.login(user.email, user.password).then((authorizedUser) => {
        store.commit(mutations.SET_AUTHORIZED, authorizedUser);
        return authorizedUser;
    });
}

/**
 * Resets user authorization info in the store by committing null.
 *
 * @param store     User Vuex store.
 */
export function resetAuthorization(
    store: ActionContext<UserState, RootState>,
): void {
    store.commit(mutations.SET_AUTHORIZED, null);
}

/**
 * Call API register action and commit created user to the store.
 *
 * @param store     User Vuex store.
 * @param user      User object with all required info for registration.
 *
 * @return   Resolved promise with new created user object,
 *           or rejected promise with error code:
 *           - 1: if user with given email is already exists.
 */
export function signUp(
    store: ActionContext<UserState, RootState>, user,
): Promise<object> {
    return UsersApi.register(user).then((addedUser) => {
        store.commit(mutations.ADD, addedUser);
        store.commit(mutations.SET_AUTHORIZED, user);
        return addedUser;
    });
}

export default  {
    fetchAll,
    login,
    resetAuthorization,
    signUp,
} as ActionTree<UserState, RootState>;
