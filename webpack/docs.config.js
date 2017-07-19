const path = require('path');
const merge = require('webpack-merge');
const TypedocWebpackPlugin = require('typedoc-webpack-plugin');

const base = require('./base.config');
const client = require('./client.config');

module.exports = merge(base, {
    entry: client.entry,
    output: {
        path: path.resolve(__dirname, '../_docs'),
    },
    node: client.node,
    plugins: [
        new TypedocWebpackPlugin({
            mode: 'modules',
            module: 'es6',
            target: 'es6',
            out: './',
            exclude: '**/{node_modules,entry}/**/*.*',
            experimentalDecorators: true,
            excludeExternals: true,
            ignoreCompilerErrors: true,
            moduleResolution: 'node',
            includeDeclarations: false,
            externalPattern: '**/*.d.ts',
            emitDecoratorMetadata: true,
            preserveConstEnums: true,
            stripInternal: true,
            suppressExcessPropertyErrors: true,
            suppressImplicitAnyIndexErrors: true,
            allowSyntheticDefaultImports: true,
            paths: {
                '*': [
                    'src/*',
                    'test/*',
                ],
            },
        }, ['./src', './test']),
    ],
});

delete module.exports.recordsOutputPath;
