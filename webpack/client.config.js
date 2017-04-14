const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');

const base = require('./base.config');

module.exports = merge(base, {
    entry: './src/entry/client.ts',
    output: {
        // hotUpdateChunkFilename: 'hot/[id].[hash].hot-update.js',
        // hotUpdateMainFilename: 'hot/[hash].hot-update.json'
    },
    node: {
        fs: 'empty'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/templates/index.html'
        }),
        new CopyWebpackPlugin([
            { from: 'assets/i18n', to: 'i18n' },
        ]),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
    ]
});
