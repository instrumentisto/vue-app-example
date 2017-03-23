import { STORAGE_KEY } from './users.ts'

const localStoragePlugin = store => {
    store.subscribe((mutation, { users }) => {
        console.log('plugin! ', users)
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(users))
    })
}

export default [localStoragePlugin]
