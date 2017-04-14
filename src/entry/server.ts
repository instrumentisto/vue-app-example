import Vue from 'vue';

import I18n from '~/I18n';
import params from '~/main';

export default (context) => {
    params.router.push(context.url);

    return Promise.all(params.router.getMatchedComponents().map((component) => {
        if (component.prefetch) {
            return component.prefetch(params.store);
        }
    })).then(() => {
        params.i18n = I18n.init(context.accept_languages);

        context.initialState = params.store.state;

        return new Vue(params);
    });
};
