import Vue from 'vue';

import 'class-component/hooks'; // must be imported first
import App from 'App.vue';
import I18n from 'I18n';
import params from 'main';

export default (context) => {
    return new Promise((resolve, reject) => {
        params.router.push(context.url);

        params.router.onReady(() => {
            const matchedComponents = params.router.getMatchedComponents();

            if (!matchedComponents.length) {
                reject({ code: 404 });
            }

            Promise.all(matchedComponents.map((component: any | Vue) => {
                return component.options.preFetch && component.options.preFetch(params.store);
            })).then(() => {
                return (App as any).options.preFetch(params.store);
            }).then(() => {
                context.state = params.store.state;

                return I18n.init(context.accept_languages).then((i18n) => {
                    params.i18n = i18n;
                });
            }).then(() => {
                resolve(new Vue(params));
            }).catch(reject);
        });
    });
};
