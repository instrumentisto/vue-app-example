import Vue from 'vue';
import VueCookie from 'vue-cookie';
import VueForm from 'vue-form';

import store from './store/index';
import i18n from './i18n/locales';
import router from './router/index';
import App from './components/App.vue';

Vue.use(VueCookie);
Vue.use(VueForm);
Vue.use(i18n);

var app = new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

if (module.hot) {
  module.hot.status((status) => {
    console.log('status', status);
    if (status === 'abort') {
      alert('hot checking aborted, reloading...');
      window.location.reload();
    }
  });
  module.hot.accept((errHandler) => {
    console.log('main accept error', errHandler);
  });
  module.hot.dispose(() => {
    console.log('main disposed');
    console.log(module.hot.data);
    app.$destroy();
    app = null;
  });
}
