'use strict';

var gulp = require('gulp');
var clean = require('gulp-clean');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var rjs = require('gulp-requirejs');
var copy = require('gulp-contrib-copy');
var cleanCSS = require('gulp-clean-css');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');
var uglify = require('gulp-uglify');
var pipeline = require('readable-stream').pipeline;
var preprocess = require('gulp-preprocess');

gulp.task('clean', function () {
   return gulp.src('public/')
       .pipe(clean())
});

// requirejs
gulp.task('requirejs:build', async function () {
return rjs({
      baseUrl: 'src/ts/',
      name: 'indexJS',
      mainConfigFile: 'src/ts/config.js',
      out: 'build.js',
      generateSourceMaps: true,
   })
     .pipe(sourcemaps.init({loadMaps: true}))
     .pipe(sourcemaps.write())
     .pipe(gulp.dest('public/js/'));

});
// Копіювання для production
gulp.task('requirejs:copy_lib', function() {
   return gulp.src(['src/lib/require.js', 'src/lib/jquery.js', 'src/ts/signIN.js', 'src/ts/signUP.js'])
       .pipe(copy())
       .pipe(gulp.dest('public/js/'));
});
gulp.task('copy-img', function () {
    return gulp.src('src/img/*.*')
        .pipe(copy())
        .pipe(gulp.dest('public/img/'));
});

/*Sass task*/
gulp.task('sass-dev', function () {
    return gulp.src('src/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('src/sass'))
});
gulp.task('sass-prod', function () {
   return gulp.src('src/sass/*.scss')
       .pipe(sass().on('error', sass.logError))
       .pipe(cleanCSS({compatibility: 'ie8'}))
       .pipe(gulp.dest('public/css'))
});

/*TS task*/
gulp.task('ts-compile', function () {
    return gulp.src('src/ts/**/*.ts')
        .pipe(tsProject())
        .pipe(gulp.dest('src/ts'))
});

gulp.task('uglify', function () {
    return pipeline(
        gulp.src('public/js/*.js'),
        uglify(),
        clean('public/js'),
        gulp.dest('public/js')
    );
});
//HTML tasks
gulp.task('html:dev', function() {
    return gulp.src('src/html/index.html')
        .pipe(preprocess({context: {NODE_ENV: 'development', DEBUG: true}}))
        .pipe(gulp.dest('./'))
});
gulp.task('html:dev-all', function() {
    return gulp.src(['src/html/signIN.html', 'src/html/signUp.html'])
        .pipe(preprocess({context: {NODE_ENV: 'development', DEBUG: true}}))
        .pipe(gulp.dest('src/views/'))
});

gulp.task('html:prod', function() {
    return gulp.src('src/html/index.html')
        .pipe(preprocess({context: {NODE_ENV: 'production', DEBUG: true}}))
        .pipe(gulp.dest('public'))
});
gulp.task('html:prod-all', function() {
    return gulp.src(['src/html/signIN.html', 'src/html/signUp.html'])
        .pipe(preprocess({context: {NODE_ENV: 'production', DEBUG: true}}))
        .pipe(gulp.dest('public/views/'))
});


gulp.task('default', gulp.series('sass-dev', 'ts-compile'));
gulp.task('dev', gulp.series('sass-dev', 'ts-compile', 'html:dev', 'html:dev-all'));
gulp.task('prod', gulp.series('clean', 'copy-img', 'html:prod', 'html:prod-all', 'ts-compile', 'sass-prod', 'requirejs:build', 'requirejs:copy_lib', 'uglify'));