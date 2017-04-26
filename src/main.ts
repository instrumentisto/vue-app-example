import Vue, {ComponentOptions} from 'vue';

import 'class-component/hooks';
import App from 'components/App.vue';
import Router from 'Router';
import store from 'store';
import Validation from 'Validation';

Validation.init();

export default {
    render: (h) => h(App),
    router: new Router().instance,
    store,
} as ComponentOptions<Vue>;
