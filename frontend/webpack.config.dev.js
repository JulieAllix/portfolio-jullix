const { merge } = require("webpack-merge");

const baseConfigGenerator = require("./webpack.config");

module.exports = baseConfigGenerator.then((baseConfig) => {
	return merge(baseConfig, {
		mode: "development",
		devServer: {
			proxy: {
				"/api": "http://backend-dev:3000",
				"/public": "http://backend-dev:3000"
			},
			host: "0.0.0.0",
			port: 9090,
			disableHostCheck: true,
			historyApiFallback: true,
		},
	});
});
