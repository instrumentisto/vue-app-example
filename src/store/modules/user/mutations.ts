import { MutationTree } from 'vuex';

import UserState from 'store/modules/user/state';

export const ADD_USER = 'ADD_USER';
export const SET_AUTHORIZED_USER = 'SET_AUTHORIZED_USER';
export const SET_USERS_LIST = 'SET_USERS_LIST';

export default {
    [ADD_USER]: (state: UserState, user) => {
        state.all.push(user);
    },
    [SET_AUTHORIZED_USER]: (state: UserState, user) => {
        if (user && user.password) {
            delete user.password;
        }
        state.authorized = user;
    },
    [SET_USERS_LIST]: (state: UserState, users) => {
        state.all = users;
    },
} as MutationTree<UserState>;
