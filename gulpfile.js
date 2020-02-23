var gulp = require('gulp');
var syncJSON = require('gulp-sync-json');
const { src, dest } = require('gulp');
const htmlmin = require('gulp-html-minifier');

 
gulp.task('sync-json', function() {
    return gulp.src('./locales/*.json')
        .pipe(syncJSON('ru.json'))
        .pipe(gulp.dest('./locales'));
});

function minify() {
  return src('./dist/**/*.html')
    .pipe(htmlmin({ removeComments: true, collapseWhitespace: true }))
    .pipe(dest('./dist'))
}

exports.default = minify;