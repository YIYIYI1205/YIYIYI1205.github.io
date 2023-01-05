const path = require('path');
console.log(process.env.NODE_ENV)
module.exports = {
  mode: 'none',
  entry: './path/to/my/entry/file.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js',
  },
};