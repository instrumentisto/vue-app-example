import Vue from 'vue';
import VueCookie from 'vue-cookie';
import VueForm from 'vue-form';
import { sync } from 'vuex-router-sync';

import store from './store';
import i18n from './i18n/locales';
import router from './router';
import App from './components/App.vue';

sync(store, router);

console.log('main server!');

Vue.use(VueCookie);
Vue.use(VueForm);
Vue.use(i18n);

export default context => {
    router.push(context.url);

    return Promise.all(router.getMatchedComponents().map(component => {
        if (component.prefetch) {
            return component.prefetch(store)
        }
    })).then(() => {
        // set initial store on context
        // the request handler will inline the state in the HTML response.
        context.initialState = store.state;

        return new Vue({
            router,
            store,
            render: h => h(App),
        });
    });
};
