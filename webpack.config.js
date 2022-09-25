// entry. output. loaders. plugins. Mode. 
// 定義配置方式，打包會以此檔案為依據執行


// 讓index.html的script可以自動抓取最新的 main.bundle.js
const HtmlWebpackPlugin = require('html-webpack-plugin');

//把CSS檔案複製一份，放進dist裡面（而非整合進HTML的<head>裡面）
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// 因為下方會使用到path，所以從NodeJS裡require出來
const path = require('path');

// output: 指定bundle好的檔案，要存在哪個dir裡(path) + 檔名叫什麼(filename)
// 如果npm run build的話，就會產生一個資料夾(dist)跟bundle好的檔案。
// devServer指定起server的路徑位置

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {

    // server-bundle-filename/path
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.[hash].bundle.js',
  },
  devServer: {  
    // server-start-port   
    port:5000, 

    // server-start-dirname
    static: {       
        directory: path.join(__dirname, './dist'), 
    }   
  },

  module: {
    rules: [
      // css/scss-loader
      {
        test: /\.(css|scss)$/i,
        use:  [MiniCssExtractPlugin.loader, "css-loader"],
      },
      // Babel-loader
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        }
      },
      // asset-module
      {
        test: /\.gif/,
        type: 'asset/resource'
      }
    ],
  },

  // 讓code在呈現上易讀，方便debug
  devtool: 'source-map',
  plugins: [

    //以./base.html為模板,每次npm run build時建一個新的index.html在dist裡面
    new HtmlWebpackPlugin({
      template: './base.html'
    }),

    //每次bundle一個新的scss/css檔([hash]=亂數)
    new MiniCssExtractPlugin({
      filename: 'main.[hash].css'
    }),
  
  ]
};