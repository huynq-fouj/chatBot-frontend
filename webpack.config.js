const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: {
    widget: [
      './dist/widget/runtime.js',
      './dist/widget/polyfills.js',
      './dist/widget/main.js',
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist/embed'),
    filename: 'chat-bot-widget.min.js',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  }
};
