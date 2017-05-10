const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const TypedocWebpackPlugin = require('typedoc-webpack-plugin');

const base = require('./base.config');
const isProd = (process.env.NODE_ENV === 'production');

module.exports = merge(base, {
    entry: './src/entry/client.ts',
    output: {
        hotUpdateChunkFilename: 'hot/[id].[hash].hot-update.js',
        hotUpdateMainFilename: 'hot/[hash].hot-update.json'
    },
    node: {
        fs: 'empty'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                VUE_ENV: '"client"',
                API_URL: JSON.stringify(process.env.CLIENT_API_URL)
            }
        }),
        new HtmlWebpackPlugin({
            template: 'src/templates/index.html',
            minify: isProd
                ? {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true
                }
                : undefined
        }),
        new CopyWebpackPlugin([
            { from: 'assets/i18n', to: 'i18n' }
        ]),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ]
});

if (isProd) {
    module.exports.plugins = (module.exports.plugins || []).concat([
        new TypedocWebpackPlugin({
            mode: 'modules',
            module: 'es6',
            target: 'es6',
            out: './docs',
            exclude: '**/{node_modules,entry}/**/*.*',
            experimentalDecorators: true,
            excludeExternals: true,
            ignoreCompilerErrors: true,
            moduleResolution: "node",
            includeDeclarations: false,
            externalPattern: "**/*.d.ts",
            emitDecoratorMetadata: true,
            preserveConstEnums: true,
            stripInternal: true,
            suppressExcessPropertyErrors: true,
            suppressImplicitAnyIndexErrors: true,
            allowSyntheticDefaultImports: true,
            paths: {
                "*": [
                    "src/*",
                    "test/*"
                ]
            }
        }, ['./src', './test'])
    ])
}
