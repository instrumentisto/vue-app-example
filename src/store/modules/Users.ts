import UsersApi from '~/api/Users';
import types from '~/store/mutation-types';

export default class Users {

    public static getConfig() {
        return {
            actions: this.actions,
            getters: this.getters,
            mutations: this.mutations,
            namespaced: true,
            state: this.localState,
        };
    }

    private static localState = {
        all: [],
        authorized: null,
    };

    private static getters = {
        authorized: (state) => state.authorized,
        totalCount: (state) => {
            return state.all.length;
        },
    };

    private static actions = {
        getAll: ({ commit }) => {
            return UsersApi.getAll().then((users) => {
                commit(types.SET_USERS_LIST, { users });
            });
        },
        login: ({ commit }, { email, password }) => {
            return UsersApi.login(email, password).then((user) => {
                commit(types.SET_AUTHORIZED_USER, { user });
                return user;
            });
        },
        register: ({ commit }, { user }) => {
            return UsersApi.register(user).then((addedUser) => {
                commit(types.ADD_USER, addedUser);
                commit(types.SET_AUTHORIZED_USER, { user });
                return addedUser;
            });
        },
    };

    private static mutations = {
        [types.SET_USERS_LIST]: (state, { users }) => {
            state.all = users;
        },
        [types.ADD_USER]: (state, { user }) => {
            state.all.push(user);
        },
        [types.SET_AUTHORIZED_USER]: (state, { user }) => {
            user.password = undefined;
            state.authorized = user;
        },
        [types.RESET_AUTHORIZED_USER]: (state) => {
            state.authorized = null;
        },
    };
}
