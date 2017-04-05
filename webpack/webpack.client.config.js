const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')

const base = require('./webpack.base.config');

module.exports = merge(base, {
    entry: './src/client-entry.ts',
    output: {
        hotUpdateChunkFilename: 'hot/[id].[hash].hot-update.js',
        hotUpdateMainFilename: 'hot/[hash].hot-update.json'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/templates/index.hbs'
        }),
        new CopyWebpackPlugin([
            { from: 'assets/i18n', to: 'i18n' },
        ]),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
    ]
})
