const path = require('path');
console.log(process.argv);

const Main = {
  entry: './src/entry.js',
  output: {
    filename: './bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
              presets: [
                ['@babel/preset-env', { targets: "defaults" }]
              ]
            }
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      'react-native$': 'react-native-web'
    },
  },
};
module.exports = Main;
  