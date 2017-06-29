import Vue from 'vue';

import I18n from 'I18n';
import params from 'main';


/**
 * Describes helper class, that contains helper and common functions,
 * required fot unit specs.
 */
export default class Helper {

    /**
     * Initializes Vue application instance with rendered given component
     * and locale.
     *
     * @param component     Vue component that will be mounted and rendered
     *                      at the app root level.
     * @param mount         Specifies, if component must be mounted after
     *                      the app instance was created.
     *                      If set to "true", the component will be mounted,
     *                      and only then app instance will be returned.
     * @param locale        Optional. Specifies locale, which will be used
     *                      during rendering. Default - en.
     *
     * @return   Resolved promise with Vue application instance.
     */
    public static initApp(
        component: any,
        mount: boolean = true,
        locale: string = 'en',
    ): Promise<Vue> {
        params.render = (h) => h(component);

        return I18n.init([locale]).then((i18n) => {
            params.i18n = i18n;
            const app = new Vue(params);

            return (mount ? app.$mount() : app);
        });
    }
}
