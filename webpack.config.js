var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
     entry: './src/app.js',
     output: {
         path: './docs',
         filename: 'app.bundle-[hash:6].js'
     },
    devServer: {
      contentBase: "./public",
      inline: true,
      host: '0.0.0.0'
    },
    module: {
      loaders: [
        {
          test: /\.json$/,
          loaders: ["json-loader"]
        },{
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },{
          test: /\.scss$/,
          loaders: ["style-loader", "css-loader", "sass-loader"]
        },{
          test: /\.pug$/,
          loaders: ["pug-loader"]
        }

      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'src/index.pug'
      })
    ]
 };
