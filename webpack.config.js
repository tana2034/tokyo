(function(module) {
  var WEBPACK_CONFIG = {
    src: './app/assets/javascripts/**/*.jsx',
    entry: {
      "App": './app/assets/javascripts/App.jsx',
      "components/Home": './app/assets/javascripts/components/Home.jsx',
      "components/Image": './app/assets/javascripts/components/Image.jsx',
      "components/Place": './app/assets/javascripts/components/Place.jsx',
    },
    dest: './target/web/public/main/app/',
    output: {
      filename: "[name].js"
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
