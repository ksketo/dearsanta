const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// This is our JavaScript rule that specifies what to do with .js files
const javascript = {
  test: /\.(js)$/,
  use: [{
    loader: 'babel-loader',
    options: { presets: ['es2015'] }
  }],
};

// We can also use plugins - this one will compress the crap out of our JS
const uglify = new webpack.optimize.UglifyJsPlugin({
  compress: { warnings: false }
});

const config = {
  entry: {
    App: './public/javascripts/dearsanta-app.js'
  },
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'public', 'dist'),
    // name will be `App` because that is what we used above in our entry
    filename: '[name].bundle.js'
  },
  module: {
    rules: [javascript]
  },
  plugins: [
    // here is where we tell it to output our css to a separate file - will do nothing for now
    new ExtractTextPlugin('style.css'),
  ]
};

// webpack is cranky about some packages using a soon to be deprecated API. shhhhhhh
process.noDeprecation = true;

module.exports = config;
