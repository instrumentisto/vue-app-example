import Vue from 'vue';

import I18n from 'I18n';
import params from 'main';

export default class Helper {
    public static initApp(component, mount: boolean = true, locale: string = 'en'): Promise<Vue> {
        params.render = (h) => h(component);

        return I18n.init([locale]).then((i18n) => {
            params.i18n = i18n;
            const app = new Vue(params);

            return (mount ? app.$mount() : app);
        });
    }
}
