var gulp = require('gulp');
var browserSync = require('browser-sync');
var sequence = require('gulp-sequence');
var requireDir = require('require-dir');
var CONFIG = require('./package.json').projectConfig;
var reload = browserSync.reload;

requireDir('./tasks');

gulp.task('serve', function() {
  var obj = {};
  
  return browserSync({
    server: {
      baseDir: './',
      index: CONFIG.DST + CONFIG.PATH + '/index.html',
      routes: (
        obj['' + CONFIG.PATH] = '' + CONFIG.DST + CONFIG.PATH + '/',
        obj
      )
    }
  });
});

gulp.task('start', sequence([
  'sass',
  'browserify'
], 'serve'));

gulp.task('default', ['start'], function() {
  gulp.watch(['./' + CONFIG.DST + '/**/*.html'], [reload]);
  gulp.watch(['./' + CONFIG.SRC + '/**/*.{scss,sass}'], ['sass', reload]);
  gulp.watch(['./' + CONFIG.SRC + '/**/*.js'], ['browserify', reload]);
});
