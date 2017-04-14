const path = require('path');
const webpack = require('webpack');

module.exports = {
    output: {
        filename: 'build.js',
        path: path.resolve(__dirname, '../_build')
    },
    // recordsInputPath: path.resolve(__dirname, '../webpack/records.json'),
    // recordsOutputPath: path.resolve(__dirname, '../_build/webpack.records.json'),
    module: {
        rules: [
            // {
            //     enforce: 'pre',
            //     test: /\.ts$/,
            //     loader: 'tslint-loader',
            //     exclude: /(node_modules)/,
            //     options: {
            //         configFile: 'tslint.json'
            //     }
            // },
            {
                test: /\.ts$/,
                exclude: /node_modules|vue\/src/,
                loader: 'ts-loader',
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                    transpileOnly: true,
                    isolatedModules: true
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    // esModule: true,
                    loaders: {
                        // ts: 'ts-loader!tslint-loader'
                    }
                }
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
        alias: {
            '~': path.join(__dirname, '../src'),
            // '~api': path.join(__dirname, '../src/api'),
            'assets': path.join(__dirname, '../assets'),
            '~assets': path.join(__dirname, '../assets'),
            '~bower': path.join(__dirname, '../bower_components'),
            // '~components': path.join(__dirname, '../src/components'),
            // '~hot': path.join(__dirname, '../src/hot'),
            // '~i18n': path.join(__dirname, '../src/i18n'),
            // '~router': path.join(__dirname, '../src/router'),
            // '~store': path.join(__dirname, '../src/store'),
            // '~templates': path.join(__dirname, '../src/templates'),
            // '~util': path.join(__dirname, '../src/util'),
        },
        extensions: [".tsx", ".ts", ".js"]
    },
    performance: {
        hints: false
    },
    devtool: '#eval-source-map',
}

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
