const {merge} = require("webpack-merge");
const apiMocker = require("mocker-api");
const path = require("path");

const baseConfigGenerator = require("./webpack.config");

module.exports = baseConfigGenerator.then((baseConfig) => {
    return merge(baseConfig, {
        mode: "development",
        devServer: {
            host: "0.0.0.0",
            port: 9090,
            disableHostCheck: true,
            historyApiFallback: true,
            before(app) {
                apiMocker(app, path.resolve("./mock/index.js"));
            },
        },
    });
});
