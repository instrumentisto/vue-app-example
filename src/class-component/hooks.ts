import Component from 'vue-class-component';

/**
 * Custom hooks, that will be available in Vue components.
 */
export const supportedHooks: string[] = [
    'preFetch',
    'metaInfo',
];

Component.registerHooks(supportedHooks);
