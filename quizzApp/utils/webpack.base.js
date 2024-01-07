const {merge} = require("webpack-merge");
const webpack = require("webpack");

const themeConfigGenerator = require("./webpack.theme");
const {TsconfigPathsPlugin} = require("tsconfig-paths-webpack-plugin");

module.exports = Promise.resolve(themeConfigGenerator.then((themeConfig) => {
    return merge(themeConfig, {
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    use: {
                        loader: "babel-loader",
                    },
                },
                {
                    test: /\.(ts|tsx)/,
                    use: {
                        loader: "ts-loader",
                    },
                },
            ],
        },
        resolve: {
            extensions: [".ts", ".tsx", ".js", ".jsx", ".json", ".jsx"],
            plugins: [
                new TsconfigPathsPlugin({
                    configFile: "./tsconfig.json",
                    logLevel: "INFO",
                    extensions: [".ts", ".tsx"],
                    mainFields: ["main", "browser"]
                })
            ]
        },
        plugins: [
            new webpack.ProvidePlugin({
                moment: "moment",
            }),
        ],
    });
}));
