import Vue from 'vue'
import Router from 'vue-router'
import SignIn from '../components/pages/SignIn.vue'

Vue.use(Router)

const SignUp = resolve => {
    require.ensure(['../components/pages/SignUp.vue'], () => {
        resolve(require('../components/pages/SignUp.vue'))
    })
}

const Profile = resolve => {
    require.ensure(['../components/pages/Profile.vue'], () => {
        resolve(require('../components/pages/Profile.vue'))
    })
}

export default new Router({
    mode: 'history',
    routes: [
        { path: '/', component: SignIn },
        { path: '/sign_in', component: SignIn },
        { path: '/sign_up', component: SignUp },
        { path: '/profile', component: Profile },
    ]
})
