const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueSSRPlugin = require('vue-ssr-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');

const base = require('./base.config');
const isProd = (process.env.NODE_ENV === 'production');

module.exports = merge(base, {
    target: 'node',
    entry: './src/entry/server.ts',
    output: {
        path: path.resolve(__dirname, '../'),
        libraryTarget: 'commonjs2',
    },
    externals: nodeExternals({}),
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                VUE_ENV: '"server"',
                API_URL: JSON.stringify(process.env.SERVER_API_URL),
            },
        }),
        new VueSSRPlugin(),
        new HtmlWebpackPlugin({
            template: 'src/templates/index.server.html',
            filename: 'index.server.html',
            minify: isProd
                ? {
                    removeComments: false,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                }
                : undefined,
        }),
    ],
});
