import Util from '../util/util.ts'

export const STORAGE_KEY = 'vue-app-example-users'

export const INITIAL_USERS = [
    {
        id: '05d9c73d841428dc8da1ec0151846445',
        name:'Roman Dragan',
        email:'roman@dragan.com.ua',
        password: '123123',
    },
    {
        id: '1aedb8d9dc4751e229a335e371db8058',
        name: 'Test User',
        email: 'test@gmail.com',
        password: '321321',
    },
];

export const state = {
    all: INITIAL_USERS
}

export const getters = {
    getAll(state, getters, rootState, rootGetters) {
        rootState.loading = true
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                rootState.loading = false
                console.log('getAll', state.all)
                resolve(state.all)
            }, 1000)
        })
    },
    getById: (state, getters) => (id) => {
        return getters.getAll.then((users) => {
            let user = users.find(user => user.id === id)
            if (!user) {
                return Promise.reject('User not found')
            }
            return user
        })
    }
}

export const actions = {
    login ({getters, rootState}, {email, password}) {
        return getters.getAll.then((users) => {
            console.log('login', users)
            let user = users.find(user => {
                return (user.email === email && user.password === password)
            })
            if (!user) {
                return Promise.reject('User not found')
            }
            return user
        })
    }
}

export const mutations = {
    add (state, user) {
        console.log('add', state.all)
        user.id = Util.randomString(32)
        state.all.push(user)
    }
}

export default {
    state,
    getters,
    actions,
    mutations,
    namespaced: true
}
