import Vue from 'vue';
import VueRouter from 'vue-router';
import { Store } from 'vuex';

import 'class-component/hooks'; // must be imported first
import I18n from 'I18n';
import params from 'main';

import App from 'components/app/App.vue';


export default (context: any) => {
    return new Promise((resolve, reject) => {
        if (!params.router || !params.store) {
            return reject();
        }

        const router: VueRouter = params.router;
        const store: Store<any> = params.store;

        router.push(context.url);

        router.onReady(() => {
            const matchedComponents = router.getMatchedComponents();

            if (!matchedComponents.length) {
                reject({ code: 404 });
            }

            Promise.all(matchedComponents.map((component: any | Vue) => {
                return (component.options.preFetch
                        && component.options.preFetch(store));
            })).then(() => {
                return (App as any).options.preFetch(store);
            }).then(() => {
                return I18n.init(context.accept_languages).then((i18n) => {
                    params.i18n = i18n;
                });
            }).then(() => {
                const app = new Vue(params);

                context.state = store.state;
                context.meta = app.$meta();

                resolve(app);
            }).catch(reject);
        });
    });
};
