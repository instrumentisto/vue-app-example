import Vue from 'vue';
import VueRouter from 'vue-router';

import SignIn from 'components/pages/SignIn.vue';
import SignUp from 'components/pages/SignUp.vue';
import store from 'store';

export default class Router {

    public static init() {
        Vue.use(VueRouter);

        const Profile = (resolve) => require(['components/pages/Profile.vue'], resolve);

        const router = new VueRouter({
            mode: 'history',
            routes: [
                { path: '/', component: SignIn },
                { path: '/login', component: SignIn },
                { path: '/sign_up', component: SignUp },
                { path: '/profile', component: Profile, meta: { requiresAuth: true } },
            ],
        });

        router.beforeEach((to, from, next) => {
            store.state.loading = true;

            if (to.matched.some((record) => record.meta.requiresAuth)) {
                next();
                if (!store.state.users.authorized) {
                    next({
                        path: '/login',
                    });
                } else {
                    next();
                }
            } else {
                next();
            }
        });

        router.onReady(() => {
            store.state.loading = false;
        });

        return router;
    }
}
