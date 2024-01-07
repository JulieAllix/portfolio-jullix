const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const {merge} = require("webpack-merge");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const webpack = require("webpack");

const bootConfigGenerator = require("./utils/webpack.base");

module.exports = Promise.resolve(bootConfigGenerator.then((bootConfig) =>
    merge(bootConfig, {
        name: "app",
        entry: path.join(__dirname, "src", "index.tsx"),
        output: {
            path: path.join(__dirname, "dist"),
            filename: "bundle.js",
            chunkFilename: "js/[id]-[name].js",
            publicPath: "/",
        },
        plugins: [
            new FaviconsWebpackPlugin(
                path.join(__dirname, `./assets/img/favicon.${
                    process.env.DEV === "true" ? "dev." :
                        process.env.MOCK === "true" ? "mock." : ""
                }png`)
            ),
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: path.join(__dirname, "src", "index.html"),
            }),
            new webpack.DefinePlugin({
                // Constants in the code
            }),
            new webpack.IgnorePlugin({
                resourceRegExp: /^\.\/locale$/,
                contextRegExp: /moment$/,
            }),

        ],
    })
));
