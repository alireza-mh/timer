const webpack = require("webpack");
const path = require("path");

/* global process __dirname module */
const isProduction = process.argv.indexOf("-p") >= 0;
// plugins
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


// babel config
const babelLoaderConfig = {
    loader: 'babel-loader',
    options: {babelrc: true}
}

// ts loader Config
const tsLoaderConfig = {
    loader: "ts-loader",
}

const sourcePath = path.join(__dirname, "./src");
const outPath = path.join(__dirname, "./dist");
module.exports = {
    context: sourcePath,
    devServer: {
        contentBase: sourcePath,
        hot: true,
        disableHostCheck: true,
        // remove annoying WDS of React Hot Loader log
        clientLogLevel: 'none',
        stats: {
            warnings: false,
        },
    },
    entry: {
        main: "./index.tsx"
    },
    module: {
        rules: [
            // .js, .jsx
            {
                test: /\.(jsx?)$/,
                exclude: /node_modules/,
                use: [babelLoaderConfig]
            },
            // .ts, .tsx
            {
                test: /\.(tsx?)$/,
                exclude: /node_modules/,
                use: [
                    babelLoaderConfig,
                    isProduction && tsLoaderConfig,
                ].filter(Boolean)
            },
            {
                test: /\.(css)$/,
                use: [
                    isProduction ? MiniCssExtractPlugin.loader : "style-loader",
                    "css-loader",
                ],
            }
        ],
    },
    output: {
        filename: "[name].js",
        path: outPath,
    },
    plugins: [
        new webpack.optimize.AggressiveMergingPlugin(),
        new MiniCssExtractPlugin({
            disable: !isProduction,
            filename: "[name][hash].css",
        }),

        new HtmlWebpackPlugin({
            template: "index.html",
        }),
    ],
    resolve: {
        extensions: [".js", ".ts", ".tsx"],
        alias: {
            src: path.resolve(__dirname, 'src'),
        },
        mainFields: ["main"],
    },
    target: "web",
    watchOptions: {
        poll: 100
    },
};
