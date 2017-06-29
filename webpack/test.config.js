const path = require('path');
const merge = require('webpack-merge');

const base = require('./base.config');

module.exports = merge(base, {
    node: {
        fs: 'empty',
    },
    resolve: {
        modules: [
            path.join(__dirname, '../test'),
        ],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
        },
    },
});
