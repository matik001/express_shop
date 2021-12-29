"use strict";
// Generated using webpack-cli https://github.com/webpack/webpack-cli
var path = require("path");
var nodeExternals = require('webpack-node-externals');
var isProduction = process.env.NODE_ENV == "production";
var stylesHandler = "style-loader";
var config = {
    target: 'node',
    entry: "./src/app.ts",
    externals: [nodeExternals()],
    devtool: 'eval-source-map',
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: 'app.js'
    },
    plugins: [
    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
    ],
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/i,
                loader: "ts-loader",
                exclude: ["/node_modules/"],
            },
            {
                test: /\.css$/i,
                use: [stylesHandler, "css-loader"],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: "asset",
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
};
module.exports = function () {
    if (isProduction) {
        config.mode = "production";
    }
    else {
        config.mode = "development";
    }
    return config;
};
//# sourceMappingURL=webpack.config.js.map