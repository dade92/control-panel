var path = require('path');
const webpack = require('webpack');


const REACT_APP_STAGE = process.env.REACT_APP_STAGE

module.exports = {
    entry: {
        index: './src/main/frontend/Index.tsx',
    },
    devtool: 'source-map',
    cache: true,
    mode: 'development',
    output: {
        path: __dirname,
        filename: './src/main/resources/static/[name].bundle.js',
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.REACT_APP_STAGE': JSON.stringify(process.env.REACT_APP_STAGE),
        }),
    ],
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: [".ts", ".tsx", ".js"]
    },
    module: {
        rules: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            { test: /\.tsx?$/, loader: "ts-loader" }
        ]
    },
};