import Vue from 'vue';

import I18n from 'I18n';
import params from 'main';
import store from 'store';

I18n.init([
    store.state.locale,
    navigator.language,
]).then((i18n) => {
    params.i18n = i18n;
    new Vue(params).$mount('#app');
});

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
    });
}
