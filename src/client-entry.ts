import Vue from 'vue';

import { params } from './app';
import I18n from '~i18n';

params.i18n = I18n.init([
    Vue.cookie.get('language'),
    navigator.language,
]);

const app = new Vue(params);
app.$mount('#app');

if (module.hot) {
  module.hot.status((status) => {
    // console.log('status', status);
    if (status === 'abort') {
      alert('hot checking aborted, reloading...');
      window.location.reload();
    }
  });

  module.hot.accept((errHandler) => {
    // console.log('main accept error', errHandler);
  });

  module.hot.dispose(() => {
    // console.log('main disposed');
    // console.log(module.hot.data);
    app.$destroy();
  });
}
