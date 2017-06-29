import Vue from 'vue';


Vue.config.productionTip = false;

/**
 * Collects all unit spec files from specs folder by pattern.
 * Resulted context will be used by Karma launcher to run unit tests.
 */
const testsContext: __WebpackModuleApi.RequireContext =
    require.context('unit/specs', true, /\.spec\.ts$/);

testsContext.keys().forEach(testsContext);
