const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const VueSSRPlugin = require('vue-ssr-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');

const base = require('./base.config');

module.exports = merge(base, {
    target: 'node',
    entry: './src/entry/server.ts',
    output: {
        libraryTarget: 'commonjs2'
    },
    externals: Object.keys(require('../package.json').dependencies),
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            'process.env.VUE_ENV': '"server"'
        }),
        new VueSSRPlugin(),
        new HtmlWebpackPlugin({
            template: 'src/templates/index.server.html',
            filename: 'index.server.html'
        }),
        new CopyWebpackPlugin([
            { from: 'assets/img', to: 'img' },
            { from: 'server.js', to: 'server.js' },
        ]),
    ]
});
