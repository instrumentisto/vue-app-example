const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const base = require('./base.config');

module.exports = merge(base, {
    node: {
        fs: "empty"
    },
})
