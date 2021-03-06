const path = require('path');
const webpack = require('webpack');
const stylusLoader = require('stylus-loader');

const isProd = (process.env.NODE_ENV === 'production');

module.exports = {
    output: {
        filename: 'build.js',
    },
    recordsInputPath: path.resolve(__dirname, '../webpack/records.json'),
    recordsOutputPath:
        path.resolve(__dirname, '../webpack.records.json'),
    module: {
        rules: [
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
                            compilerOptions: {
                                isolatedModules: true,
                            },
                            transpileOnly: true,
                        },
                    },
                ],
            },
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: 'vue-loader',
                        options: {
                            // esModule: true,
                            loaders: {
                                ts: 'babel-loader!ts-loader',
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: 'img/[name].[ext]?[hash]',
                },
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'file-loader?name=fonts/[name].[ext]',
            },
            {
                test: /\.css$/,
                use: ['vue-style-loader', 'css-loader'],
            },
            {
                test: /\.styl/,
                use: ['vue-style-loader', 'stylus-loader'],
            },
        ],
    },
    resolve: {
        modules: [
            path.join(__dirname, '../src'),
            'node_modules',
        ],
        alias: {
            'assets': path.join(__dirname, '../assets'),
            '~assets': path.join(__dirname, '../assets'),
        },
        extensions: ['.tsx', '.ts', '.js'],
    },
    performance: {
        hints: false,
    },
    devtool: '#cheap-module-eval-source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            },
        }),
        new stylusLoader.OptionsPlugin({
            default: {
                preferPathResolver: 'webpack',
          },
        }),
    ],
};

if (isProd) {
    delete module.exports.recordsOutputPath;
    module.exports.devtool = false;
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false,
            },
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
        }),
    ]);
}
