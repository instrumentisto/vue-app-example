import Vue from 'vue';

import I18n from 'I18n';
import params from 'main';

export default class Helper {
    public static initApp(component, autoMount: boolean = true) {
        params.i18n = I18n.init(['en'], require('~assets/i18n/en.json'));
        params.render = (h) => h(component);

        const app = new Vue(params);

        return (autoMount ? app.$mount() : app);
    }
}
