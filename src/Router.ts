import Vue from 'vue';
import VueRouter from 'vue-router';
import { Route, RouterMode, RouterOptions } from 'vue-router/types/router';

import SignIn from 'components/pages/SignIn.vue';
import SignUp from 'components/pages/SignUp.vue';
import store from 'store';

const Profile = () => System.import('components/pages/Profile.vue');

export default class Router implements RouterOptions {

    public routes = [
        { path: '/', component: SignIn },
        { path: '/login', component: SignIn },
        { path: '/sign_up', component: SignUp },
        { path: '/profile', component: Profile, meta: { requiresAuth: true } },
    ];

    public mode = 'history' as RouterMode;

    private router: VueRouter;

    public constructor() {
        Vue.use(VueRouter);

        this.router = new VueRouter(this);

        this.router.beforeEach(this.beforeEach);
        this.router.onReady(this.onReady);
    }

    public get instance() {
        return this.router;
    }

    private beforeEach(to: Route, from: Route, next) {
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
    }

    private onReady() {
        store.state.loading = false;
    }
}
