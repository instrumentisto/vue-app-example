import Vue, {ComponentOptions} from 'vue';

import 'class-component/hooks'; // must be imported first
import App from 'App.vue'; // tslint:disable-line
import Router from 'Router';
import store from 'store';
import Validation from 'Validation';

Validation.init();

/**
 * Initial app params, that can be used for initializing Vue app instance in
 * all environments: client, server, test.
 */
export const params: ComponentOptions<Vue> = {
    render: (h) => h(App),
    router: new Router().instance,
    store,
};

export default params;
