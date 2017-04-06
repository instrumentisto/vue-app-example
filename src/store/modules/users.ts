import Api from '../../api/users'
import types from '../mutation-types'

export const state = {
    all: [],
    authorized: null
}

export const getters = {
    totalCount: state => {
        return state.all.length;
    },
    authorized: state => state.authorized
}

export const actions = {
    getAll ({ commit }) {
        return Api.getAll().then((users) => {
            commit(types.SET_USERS_LIST, { users });
        })
    },
    register ({ commit }, { user }) {
        return Api.register(user).then((addedUser) => {
            commit(types.ADD_USER, addedUser);
            commit(types.SET_AUTHORIZED_USER, { user });
            return addedUser;
        })
    },
    login ({ commit }, { email, password }) {
        return Api.login(email, password).then((user) => {
            commit(types.SET_AUTHORIZED_USER, { user });
            return user;
        });
    }
}

export const mutations = {
    [types.SET_USERS_LIST] (state, { users }) {
        state.all = users;
    },
    [types.ADD_USER] (state, { user }) {
        state.all.push(user);
    },
    [types.SET_AUTHORIZED_USER] (state, { user }) {
        user.password = undefined;
        state.authorized = user;
    },
    [types.RESET_AUTHORIZED_USER] (state) {
        state.authorized = null;
    }
}

export default {
    state,
    getters,
    actions,
    mutations,
    namespaced: true
}
