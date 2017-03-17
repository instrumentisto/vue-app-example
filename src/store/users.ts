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
    all: JSON.parse(window.localStorage.getItem(STORAGE_KEY) || JSON.stringify(INITIAL_USERS))
}

export const getters = {
    getAll(state, getters, rootState, rootGetters) {
        rootState.loading = true
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                rootState.loading = false
                resolve(state.all)
            }, 1000)
        })
    }
}

export const actions = {
    login ({getters, rootState}, {email, password}) {
        return getters.getAll.then((users) => {
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
    add (state, email) {
        state.all.push({
            id: 123213,
            email: email
        })
    },

    // deleteTodo (state, { todo }) {
    //     state.todos.splice(state.todos.indexOf(todo), 1)
    // },
    //
    // toggleTodo (state, { todo }) {
    //     todo.done = !todo.done
    // },

    // editTodo (state, { todo, value }) {
    //     todo.text = value
    // },

    // toggleAll (state, { done }) {
    //     state.todos.forEach((todo) => {
    //         todo.done = done
    //     })
    // },
    //
    // clearCompleted (state) {
    //     state.todos = state.todos.filter(todo => !todo.done)
    // }
}

export default {
    state,
    getters,
    actions,
    mutations,
    namespaced: true
}
