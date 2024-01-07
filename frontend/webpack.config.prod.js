const {merge} = require("webpack-merge");
const path = require("path");

const baseConfigGenerator = require("./webpack.config");

module.exports = baseConfigGenerator.then((baseConfig) => {
    return merge(baseConfig, {
        mode: "production",
        output: {
            path: path.join(__dirname, "../prod/webroot"),
            filename: "[name].[chunkhash:8].js",
            chunkFilename: "js/[id].[chunkhash:8].js",
        },
        optimization: {
            splitChunks: {
                chunks: "all",
            },
        },
    });
});
