import { MutationTree } from 'vuex';

import UserState from 'store/modules/user/state';

export const ADD = 'ADD';
export const SET_AUTHORIZED = 'SET_AUTHORIZED';
export const SET_LIST = 'SET_LIST';

export default {
    [ADD]: (state: UserState, user) => {
        state.all.push(user);
    },
    [SET_AUTHORIZED]: (state: UserState, user) => {
        if (user && user.password) {
            delete user.password;
        }
        state.authorized = user;
    },
    [SET_LIST]: (state: UserState, users) => {
        state.all = users;
    },
} as MutationTree<UserState>;
