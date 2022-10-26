const path = require('path');

module.exports = {
  entry: './src/frontend/main.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'static/assets/dist'),
  },
  devServer: {
    static: path.resolve(__dirname, 'static/assets/dist'),
    port: 8080,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.(scss)$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: () => [require('autoprefixer')],
              },
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
};
