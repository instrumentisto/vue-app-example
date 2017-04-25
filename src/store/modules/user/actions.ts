import { ActionContext, ActionTree } from 'vuex';

import UsersApi from 'api/Users';
import * as mutations from 'store/modules/user/mutations';
import UserState from 'store/modules/user/state';

export const FETCH_ALL = 'FETCH_ALL';
export const LOGIN = 'LOGIN';
export const RESET_AUTHORIZATION = 'RESET_AUTHORIZATION';
export const SIGN_UP = 'SIGN_UP';

export default {
    [FETCH_ALL]: (store: ActionContext<UserState, any>) => {
        return UsersApi.getAll().then((users) => {
            store.commit(mutations.SET_USERS_LIST, users);
        });
    },
    [LOGIN]: (store: ActionContext<UserState, any>, { email, password }) => {
        return UsersApi.login(email, password).then((user) => {
            store.commit(mutations.SET_AUTHORIZED_USER, user);
            return user;
        });
    },
    [RESET_AUTHORIZATION]: (store: ActionContext<UserState, any>) => {
        store.commit(mutations.SET_AUTHORIZED_USER, null);
    },
    [SIGN_UP]: (store: ActionContext<UserState, any>, user) => {
        return UsersApi.register(user).then((addedUser) => {
            store.commit(mutations.ADD_USER, addedUser);
            store.commit(mutations.SET_AUTHORIZED_USER, user);
            return addedUser;
        });
    },
} as ActionTree<UserState, any>;
