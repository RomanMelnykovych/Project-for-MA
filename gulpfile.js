'use strict';

var gulp = require('gulp');
var clean = require('gulp-clean');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var rjs = require('gulp-requirejs');
var copy = require('gulp-contrib-copy');
var amdOptimize = require('gulp-amd-optimize');



var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');

var rename = require("gulp-rename");


gulp.task('clean', function () {
   return gulp.src('public')
       .pipe(clean())
});

// Сборка requirejs
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
// Копирование библиотеки require.js для production
gulp.task('requirejs:copy_lib', function() {
   return gulp.src('src/lib/require.js')
       .pipe(copy())
       .pipe(gulp.dest('public/js/'));
});

//
// gulp.task('amd', function () {
//      return gulp.src(["src/lib/*.js", "src/ts/*.js", "src/ts/modules/*.js"])
//         .pipe(amdOptimize("indexJS"),{
//             baseUrl: 'src/ts',
//             // paths : {
//             //     "jquery" : "src/lib/jquery",
//             //     "eventHandler": "src/ts/modules/eventHandler",
//             //     "getDate": "src/ts/modules/getDate",
//             //     "searchMethod": "src/ts/modules/searchMethod",
//             //     "amountMethod": "src/ts/modules/amountMethod",
//             //     "historyMethod": "src/ts/modules/historyMethod",
//             //     "chartMethod": "src/ts/modules/chartMethod",
//             //     "reloadData": "src/ts/modules/reloadData"
//             // },
//             configFile : "src/ts/config.js"
//         })
//         .pipe(concat("index.js"))
//         .pipe(gulp.dest("public"));
// });


/*Sass task*/
gulp.task('sass', function () {
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

gulp.task('watch', function () {
    gulp.watch('src/sass/*.scss', ['sass']);
    gulp.watch('src/ts/**/*.ts', ['ts-compile']);
});

gulp.task('default', gulp.parallel('sass', 'ts-compile'));
gulp.task('dev', gulp.parallel('sass', 'ts-compile'));
gulp.task('prod', gulp.parallel('clean'));