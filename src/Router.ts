import Vue from 'vue';
import VueRouter from 'vue-router';

import SignIn from '~/components/pages/SignIn.vue';
import SignUp from '~/components/pages/SignUp.vue';

export default class Router {

    public static init() {
        Vue.use(VueRouter);

        const Profile = (resolve) => require(['~/components/pages/Profile.vue'], resolve);

        return new VueRouter({
            mode: 'history',
            routes: [
                { path: '/', component: SignIn },
                { path: '/sign_in', component: SignIn },
                { path: '/sign_up', component: SignUp },
                { path: '/profile', component: Profile },
            ],
        });
    }
}
