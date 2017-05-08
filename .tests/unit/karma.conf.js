const webpackConfig = require('../../webpack/test.config.js');

module.exports = function (config) {
    config.set({
        browsers: ['PhantomJS'],
        frameworks: ['mocha', 'chai'],
        reporters: ['spec'],
        files: [
            '../../node_modules/babel-polyfill/dist/polyfill.js',
            './index.ts'
        ],
        preprocessors: {
            './index.ts': ['webpack']
        },
        webpack: webpackConfig,
        webpackMiddleware: {
            noInfo: true
        }
    });
};
