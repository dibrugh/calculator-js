const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

const mode = process.env.NODE_ENV || "development";
const devMode = mode === "development";
const target = devMode ? "web" : "browserslist";

module.exports = {
    mode,
    target,
    entry: {
        filename: path.resolve(__dirname, "src/index.js"),
    },
    output: {
        clean: true,
        filename: "[name][contenthash].js",
        path: path.resolve(__dirname, "dist"),
        assetModuleFilename: "[name][ext]",
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Calculator",
            template: "src/index.html",
        }),
    ],
    performance: {
        hints: false,
        maxAssetSize: 512000,
        maxEntrypointSize: 512000,
    },
    devServer: {
        static: {
            directory: path.join(__dirname, "dist"),
        },
        compress: true,
        port: 9000,
        hot: true,
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: "html-loader",
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/i,
                type: "asset/resource",
            },
            {
                test: /\.svg/,
                type: "asset/inline",
            },
            {
                test: /\.m?js$/i,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                    },
                },
            },
        ],
    },
};
