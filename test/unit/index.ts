import Vue from 'vue';

Vue.config.productionTip = false;

let testsContext = require.context('unit/specs', true, /\.spec\.ts$/);
testsContext.keys().forEach(testsContext);
