const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');

const base = require('./base.config');
const isProd = (process.env.NODE_ENV === 'production');

module.exports = merge(base, {
    entry: './src/entry/client.ts',
    output: {
        path: path.resolve(__dirname, '../public'),
        hotUpdateChunkFilename: 'hot/[id].[hash].hot-update.js',
        hotUpdateMainFilename: 'hot/[hash].hot-update.json',
    },
    node: {
        fs: 'empty',
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                VUE_ENV: '"client"',
                API_URL: JSON.stringify(process.env.CLIENT_API_URL),
            },
        }),
        new HtmlWebpackPlugin({
            template: 'src/templates/index.html',
            minify: isProd
                ? {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                }
                : undefined,
        }),
        new CopyWebpackPlugin([
            {from: 'assets/i18n', to: 'i18n'},
        ]),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
    ],
});
