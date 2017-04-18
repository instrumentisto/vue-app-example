import UsersApi from 'api/Users';

export default class Users {

    public static readonly mutationTypes = {
        ADD_USER: 'ADD_USER',
        RESET_AUTHORIZED_USER: 'RESET_AUTHORIZED_USER',
        SET_AUTHORIZED_USER: 'SET_AUTHORIZED_USER',
        SET_USERS_LIST: 'SET_USERS_LIST',
    };

    public static getModule() {
        return {
            actions: this.actions,
            getters: this.getters,
            mutations: this.mutations,
            namespaced: true,
            state: this.state,
        };
    }

    private static state = {
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
                commit(Users.mutationTypes.SET_USERS_LIST, { users });
            });
        },
        login: ({ commit }, { email, password }) => {
            return UsersApi.login(email, password).then((user) => {
                commit(Users.mutationTypes.SET_AUTHORIZED_USER, { user });
                return user;
            });
        },
        register: ({ commit }, { user }) => {
            return UsersApi.register(user).then((addedUser) => {
                commit(Users.mutationTypes.ADD_USER, addedUser);
                commit(Users.mutationTypes.SET_AUTHORIZED_USER, { user });
                return addedUser;
            });
        },
    };

    private static mutations = {
        [Users.mutationTypes.SET_USERS_LIST]: (state, { users }) => {
            state.all = users;
        },
        [Users.mutationTypes.ADD_USER]: (state, { user }) => {
            state.all.push(user);
        },
        [Users.mutationTypes.SET_AUTHORIZED_USER]: (state, { user }) => {
            user.password = undefined;
            state.authorized = user;
        },
        [Users.mutationTypes.RESET_AUTHORIZED_USER]: (state) => {
            state.authorized = null;
        },
    };
}
