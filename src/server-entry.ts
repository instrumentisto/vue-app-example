import { app, router, store } from './app';

export default context => {
    router.push(context.url);

    return Promise.all(router.getMatchedComponents().map(component => {
        if (component.prefetch) {
            return component.prefetch(store)
        }
    })).then(() => {
        // set initial store on context
        // the request handler will inline the state in the HTML response.
        context.initialState = store.state;

        return app;
    });
};
