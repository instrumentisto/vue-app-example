import Vue from 'vue';

Vue.config.productionTip = false;

const testsContext = require.context('./specs', true, /\.spec\.ts$/);
testsContext.keys().forEach(testsContext);
