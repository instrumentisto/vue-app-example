import Vue from 'vue';

Vue.config.productionTip = false;

const testsContext = require.context('unit/specs', true, /\.spec\.ts$/);
testsContext.keys().forEach(testsContext);
