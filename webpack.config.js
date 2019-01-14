const HtmlWebPackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const htmlWebpackPlugin = new HtmlWebPackPlugin({
  template: './src/index.html',
  filename: './index.html',
});

const environmentVariables = new webpack.DefinePlugin({
  'process.env': {
    BPM_PEOPLE_API_URL: JSON.stringify(process.env.BPM_PEOPLE_API_URL),
  },
});

module.exports = {
  module: {
    rules: [
      {
        parser: {
          amd: false,
        },
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['babel-preset-es2015', 'babel-preset-react', 'babel-preset-stage-2'].map(require.resolve),
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]_[local]_[hash:base64]',
              sourceMap: true,
              minimize: true,
            },
          },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/',
          },
        }],
      },
    ],
  },
  plugins: [htmlWebpackPlugin, environmentVariables],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
