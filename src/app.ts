import Vue from 'vue';
import VueCookie from 'vue-cookie';
import VueForm from 'vue-form';
import { sync } from 'vuex-router-sync';

import App from './components/App.vue';
import i18n from './i18n/locales';
import router from './router';
import store from './store';

Vue.use(VueCookie);
Vue.use(VueForm);
Vue.use(i18n);

sync(store, router);

const app = new Vue({
    router,
    store,
    render: h => h(App),
});

export { app, router, store };
