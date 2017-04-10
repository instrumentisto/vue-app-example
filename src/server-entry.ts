import { app, router, store } from './app';
import I18n from '~i18n';

export default (context) => {
    router.push(context.url);

    return Promise.all(router.getMatchedComponents().map((component) => {
        if (component.prefetch) {
            return component.prefetch(store);
        }
    })).then(() => {
        I18n.init(context.accept_languages);

        context.initialState = store.state;

        return app;
    });
};
