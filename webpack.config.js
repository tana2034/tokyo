(function(module) {
  var WEBPACK_CONFIG = {
    entry: './app/assets/javascripts/App.jsx',
    dest: './target/web/public/main/app/',
    output : {
      filename : 'main.build.js'
    },
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          loader: 'babel',
          query: {
              presets:['es2015', 'react']
          }
        }
      ]
    },
  };
  module.exports = WEBPACK_CONFIG
}(module));