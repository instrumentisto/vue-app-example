const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueSSRPlugin = require('vue-ssr-webpack-plugin')

module.exports = {
    target: 'node',
    entry: './src/main.server.ts',
    output: {
        path: path.resolve(__dirname, './_build'),
        // publicPath: '/',
        filename: 'build.js',
        // hotUpdateChunkFilename: 'hot/[id].[hash].hot-update.js',
        // hotUpdateMainFilename: 'hot/[hash].hot-update.json',
        libraryTarget: 'commonjs2'
    },
    // recordsInputPath: path.resolve(__dirname, 'webpack.records.json'),
    // recordsOutputPath: path.resolve(__dirname, './_build/webpack.records.json'),
    module: {
        rules: [
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
            {
                test: /\.hbs$/,
                loader: 'handlebars-loader'
            },
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        },
        extensions: [".tsx", ".ts", ".js"]
    },
    performance: {
        hints: false
    },
    externals: Object.keys(require('./package.json').dependencies),
    devtool: '#source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            'process.env.VUE_ENV': '"server"'
        }),
        new VueSSRPlugin(),
        new HtmlWebpackPlugin({
            template: 'src/templates/index.server.hbs',
            filename: 'index.server.html'
        }),
        new CopyWebpackPlugin([
            { from: 'assets/i18n', to: 'i18n' },
            { from: 'assets/img', to: 'img' },
            { from: 'assets/img/favicon.ico', to: 'assets/img/favicon.ico' },
            { from: 'server.js', to: 'server.js' },
        ]),
    ]
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
