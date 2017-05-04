const path = require('path');
const webpack = require('webpack');
const TypedocWebpackPlugin = require('typedoc-webpack-plugin');

module.exports = {
    output: {
        filename: 'build.js',
        path: path.resolve(__dirname, '../_build')
    },
    recordsInputPath: path.resolve(__dirname, '../webpack/records.json'),
    recordsOutputPath: path.resolve(__dirname, '../_build/webpack.records.json'),
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.ts$/,
                loader: 'tslint-loader',
                exclude: /node_modules/,
                options: {
                    configFile: 'tslint.json'
                }
            },
            {
                test: /\.ts$/,
                exclude: /node_modules|vue\/src/,
                use: [
                    {
                        loader: 'babel-loader',
                    },
                    {
                        loader: 'ts-loader',
                        options: {
                            appendTsSuffixTo: [/\.vue$/],
                            transpileOnly: true,
                            isolatedModules: true
                        }
                    },
                ]
            },
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: 'vue-loader',
                        options: {
                            // esModule: true,
                            loaders: {
                                ts: 'babel-loader!ts-loader!tslint-loader',
                            },
                        },
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: 'img/[name].[ext]?[hash]'
                }
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'file-loader?name=fonts/[name].[ext]'
            },
        ]
    },
    resolve: {
        modules: [
            path.join(__dirname, '../src'),
            'node_modules',
        ],
        alias: {
            'assets': path.join(__dirname, '../assets'),
            '~assets': path.join(__dirname, '../assets'),
            '~bower': path.join(__dirname, '../bower_components'),
        },
        extensions: [".tsx", ".ts", ".js"]
    },
    performance: {
        hints: false
    },
    devtool: '#eval-source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                API_URL: JSON.stringify(process.env.API_URL),
            },
        }),
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
            excludeNotExported: true,
            paths: {
                "*": [
                    "src/*",
                    "test/*"
                ]
            },
        }, ['./src']),
    ],
};

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ])
}
