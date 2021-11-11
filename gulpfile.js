const gulp = require('gulp');
var sass = require('gulp-sass')(require('sass'));
var uglifycss = require('gulp-uglifycss');
const imageop = require('gulp-image');
const htmlmin = require('gulp-htmlmin');

gulp.task('sass', function () {
    return gulp.src('src/sass/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('dist/css'));
  });

gulp.task('css', function () {
  gulp.src('dist/css/*.css')
    .pipe(uglifycss({
      "uglyComments": true
    }))
    .pipe(gulp.dest('dist/css-min'));
});

gulp.task('minifyHtml', () => {
  return gulp.src('*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist'));
});

//npm install --save-dev gulp-image=in cmd
gulp.task('imageop', function() {
  return gulp.src('src/images/*.jpg')
  .pipe(imageop())
  .pipe(gulp.dest('dist/img'));
})

gulp.task('develop', gulp.series('sass', 'css', 'minifyHtml', 'imageop'));
