var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var livereload = require('gulp-livereload');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('styles', function() {
    return gulp
        .src('public/css/scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public/css'));
});

gulp.task('watch', function() {
    gulp.watch('public/css/**/*.scss', ['styles']);
});

gulp.task('server', function() {
    nodemon({
        'script': 'index.js',
        'ignore': 'public/js/*.js'
    });
});

gulp.task('serve', ['server', 'watch']);
gulp.task('default', ['serve']);