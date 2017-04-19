import Vue from 'vue';
import VueCookie from 'vue-cookie';

import App from 'components/App.vue';
import Router from 'Router';
import store from 'store';
import Validation from 'Validation';

Vue.use(VueCookie);

Validation.init();

export default {
    render: (h) => h(App),
    router: Router.init(),
    store,
};
