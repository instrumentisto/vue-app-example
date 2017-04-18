import Vue from 'vue';
import VueCookie from 'vue-cookie';
// import { sync } from 'vuex-router-sync';
import VueResource from 'vue-resource';

import App from 'components/App.vue';
import Router from 'Router';
import RootStore from 'store/Root';
import Validation from 'Validation';

Vue.use(VueCookie);
Vue.use(VueResource);

Validation.init();

// sync(store, router);

export default {
    render: (h) => h(App),
    router: Router.init(),
    store: RootStore.init(),
};
