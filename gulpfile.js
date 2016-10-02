(function() {
  'use strict';

  var gulp = require('gulp');
  var uglify = require('gulp-uglify');
  var webpack = require('webpack-stream');
  var wpConf = require('./webpack.config.js');

  gulp.task('default', function() {
    console.log('gulp default task.');
  });

  gulp.task('build', function() {
    gulp.src(wpConf.entry).pipe(webpack(wpConf)).pipe(gulp.dest(wpConf.dest));
  });

  gulp.task('minify', function() {
    gulp.src('./target/web/public/main/app/main.build.js').pipe(uglify()).pipe(gulp.dest('./target/web/public/main/app'));
  });

  function errorHandler(err) {
    console.log('Error: ' + err.message);
  }

})();