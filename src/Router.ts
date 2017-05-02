import Vue from 'vue';
import VueRouter from 'vue-router';
import { Route, RouteConfig, RouterMode, RouterOptions } from 'vue-router/types/router';

import store from 'store';
import SignIn from 'views/SignIn.vue';
import SignUp from 'views/SignUp.vue';

const Profile = () => System.import('views/Profile.vue');

/**
 * Describes vue-router configuration.
 *
 * More info: http://router.vuejs.org/en/
 *
 * @implements RouterOptions
 */
export default class Router implements RouterOptions {

    /**
     * List of all routes, supported by application.
     * Each router must implement RouteConfig interface, and has at least
     * "path" and "component" properties.
     *
     * @type {RouteConfig[]}
     */
    public routes = [
        { path: '/', component: SignIn },
        { path: '/login', component: SignIn },
        { path: '/sign_up', component: SignUp },
        { path: '/profile', component: Profile, meta: { requiresAuth: true } },
    ];

    /**
     * Vue-router operating mode.
     * Available values:
     * - hash
     * - history
     *
     * More info: http://router.vuejs.org/en/api/options.html
     *
     * @type {RouterMode}
     */
    public mode = 'history' as RouterMode;

    /**
     * Vue-router initialized instance.
     */
    private router: VueRouter;

    /**
     * Creates router instance with pre-configured class properties.
     */
    public constructor() {
        Vue.use(VueRouter);

        this.router = new VueRouter(this);

        this.router.beforeEach(this.beforeEach);
        this.router.onReady(this.onReady);
    }

    /**
     * Returns vue-router instance.
     *
     * @returns {VueRouter}
     */
    public get instance() {
        return this.router;
    }

    /**
     * Function that, will be executed before each page navigation
     *
     * @param {Route} to        Route, to which navigation is performed.
     * @param {Route} from      Route, from which navigation is performed.
     * @param {function} next   Function, that MUST be called after
     *                          performing all other actions.
     */
    private beforeEach(to: Route, from: Route, next) {
        store.state.loading = true;

        if (to.matched.some((record) => record.meta.requiresAuth)) {
            next();
            if (!store.state.user.authorized) {
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

    /**
     * Function, that will be performed, after route initialization was
     * performed.
     */
    private onReady() {
        store.state.loading = false;
    }
}
