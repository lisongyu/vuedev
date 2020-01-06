const path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');
const {
  CleanWebpackPlugin
} = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
module.exports = {
  //入口文件配置
  mode: 'development',
  devtool: 'cheap-module-eval-source-map', //文件跟踪
  entry: {
    index: "./src/index.js"

  },
  output: {
    // publicPath: "./",
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js"
  },
  devServer: {
    contentBase: './dist', //资源目录
    open: true, //自动打开浏览器
    port: 8081, //端口
    hot: true,
    hotOnly: true,
    proxy: {
      "/api": {
        target: "http://localhost:9092"
      }
    }
  },
  module: {
    rules: [{
        test: /\.(jpe?g|png)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: "[name].[ext]",
            outputPath: "imgs/",
            limit: 2048
          }
        }
    },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader:"babel-loader"

      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css"
    }),
    new HtmlWebpackPlugin({
      title: 'My App',
      template: "./index.html",
      filename: "index.html",
      chunks: ["index"]

    }),
    //热替换
    new webpack.HotModuleReplacementPlugin()


  ]

}