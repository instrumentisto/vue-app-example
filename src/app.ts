import Vue from 'vue';
import VueCookie from 'vue-cookie';
import VueForm from 'vue-form';
import { sync } from 'vuex-router-sync';
import VueResource from 'vue-resource';

import App from '~components/App.vue';
import router from '~router';
import store from '~store';

Vue.use(VueCookie);
Vue.use(VueForm);
Vue.use(VueResource);

sync(store, router);

const params = {
    router,
    store,
    render: (h) => h(App),
};

export { params, router, store };
