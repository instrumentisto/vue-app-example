const webpackConfig = require('../../webpack/test.config.js');

module.exports = function (config) {
    config.set({
        browsers: ['PhantomJS'],
        frameworks: [/*'jasmine',*/'mocha', 'sinon-chai', /*'phantomjs-shim'*/],
        reporters: ['progress', 'mocha'/*, 'spec'*/],
        files: ['./index.ts'],
        preprocessors: {
            './index.ts': ['webpack'/*, 'sourcemap'*/]
        },
        webpack: webpackConfig,
        webpackMiddleware: {
            noInfo: true,
        },
        // logLevel: config.LOG_DEBUG
    });
};
