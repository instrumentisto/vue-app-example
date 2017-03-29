import Vue from 'vue';
import Router from 'vue-router';

import SignIn from '../components/pages/SignIn.vue';
import SignUp from '../components/pages/SignUp.vue';

Vue.use(Router);

const Profile = resolve => require(['../components/pages/Profile.vue'], resolve);

export default new Router({
    mode: 'history',
    routes: [
        { path: '/', component: SignIn },
        { path: '/sign_in', component: SignIn },
        { path: '/sign_up', component: SignUp },
        { path: '/profile', component: Profile },
    ]
});
