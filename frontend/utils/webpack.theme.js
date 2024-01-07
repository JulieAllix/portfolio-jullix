const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = Promise.resolve({
    plugins: [new MiniCssExtractPlugin()],
    module: {
        rules: [
            // Styles
            {
                test: /\.s?[ca]ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    //{
                    //    // Inject result in DOM
                    //    loader: "style-loader",
                    //},
                    {
                        // to convert the resulting CSS to Javascript to be bundled
                        loader: "css-loader",
                        options: {
                            importLoaders: 1,
                            sourceMap:
                                process.env.NODE_ENV !== "production",
                        },
                    },
                    {
                        // Convert SAAS to CSS
                        loader: "sass-loader",
                        options: {
                            implementation: require('sass'),
                            sourceMap:
                                process.env.NODE_ENV !== "production",
                        },
                    }
                ],
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    //{
                    //    // Inject result in the DOM with <style> tags
                    //    loader: "style-loader",
                    //},
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1,
                            sourceMap:
                                process.env.NODE_ENV !== "production",

                        },
                    },
                    {
                        loader: "less-loader",
                        options: {
                            lessOptions: {
                                javascriptEnabled: true,
                            },

                            // TODO
                            //prependData: JSON.stringify(antThemeVariables)
                        },
                    },
                ],
            },

            // static assets
            {
                test: /\.png$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 10000,
                            name: "img/[hash].[ext]",
                        },
                    },
                ],
            },
            {
                test: /\.jpg$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "img/[hash].[ext]",
                        },
                    },
                ],
            },
            {
                test: /\.gif$/,
                use: "url-loader?limit=10000",
            },
            {
                test: /\.svg/,
                use: "svg-url-loader"
            },

            // If fonts/images size are lower than 10K, embbed them in the css file
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                use: {
                    loader: "url-loader",
                    options: {
                        limit: 10000,
                        mimetype: "application/font-woff",
                        name: "fonts/[hash].woff",
                    },
                },
            },
            {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                use: {
                    loader: "url-loader",
                    options: {
                        limit: 10000,
                        mimetype: "application/font-woff",
                        name: "fonts/[hash].woff2",
                    },
                },
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                use: {
                    loader: "url-loader",
                    options: {
                        limit: 10000,
                        mimetype: "application/octet-stream",
                        name: "fonts/[hash].ttf",
                    },
                },
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                use: {
                    loader: "url-loader",
                    options: {
                        name: "fonts/[hash].eot",
                    },
                },
            },
        ],
    },
});
