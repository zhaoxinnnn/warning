const webpack = require("webpack");
const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const openBrowserWebpackPlugin = require("open-browser-webpack-plugin");

module.exports = {
    entry : "./src/app/app.js",
    output : {
      path : path.resolve(__dirname,"dist"),
      filename : "bundle.js"
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            use: ['babel-loader'],
            include: path.join(__dirname, 'src')
        }, {
            test: /\.(less|css|scss|sass)$/,
            use: ["style-loader", "css-loader", "less-loader","sass-loader"]
        }, {
            test: /\.(png|jpg|gif|md)$/,
            use: ['file-loader?limit=10000&name=[md5:hash:base64:10].[ext]']
        }, {
            test: /\.(ttf|svg)(\?v=\d+\.\d+\.\d+)?$/,
            use: ['url-loader?limit=10000&mimetype=image/svg+xml']
        }],
    },
    plugins: [
        new htmlWebpackPlugin({
            template : "./index.html"
        }),
        new openBrowserWebpackPlugin({
            url : "http://localhost:3000"
        })
    ],
    devServer: {
        port : 3000,
        //可以在局域网中使用ip访问
        host : "0.0.0.0",
        disableHostCheck : true
    }
}
