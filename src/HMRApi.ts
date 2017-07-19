// tslint:disable

/**
 * Hot reload API for Vue components.
 *
 * Note, that it's available only in browser.
 * In server environment it will return null.
 *
 * More info: https://github.com/vuejs/vue-hot-reload-api
 */
export const api = (typeof window !== 'undefined')
    ? require('vue-hot-reload-api')
    : null;

export default api;
