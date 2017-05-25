/**
 * Created by butko on 13.05.2017.
 */
'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    minify = require('gulp-clean-css'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'), //JavaScript компрессор.
    rename = require('gulp-rename'), //
    notify = require('gulp-notify'),
    watch = require('gulp-watch'), // автоотследивание изминений

    imageop = require('gulp-image-optimization'), // минификатор картинок
    image = require('gulp-image'),         // минификатор картинок
    imagemin = require('gulp-imagemin'), // минификатор картинок

    browserSync = require('browser-sync').create(); // перезапуск браузера
    // staticServer = require('node-static'); // сервер



gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./../",
        },
        port: 5000
    });
});


gulp.task('styles', function () {
    gulp.src('sass/style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(minify())
        .pipe(rename({suffix: '.min'}))

        .pipe(gulp.dest('../css'))
        .pipe(browserSync.stream())
        .pipe(notify('Style task completed'))
});
gulp.task('scripts', function() {
    gulp.src('src/js/main.js')
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('../js/'))
        .pipe(browserSync.stream())
        .pipe(notify('Scripts task completed'))
});

gulp.task('default', ['browser-sync'], function() {
    gulp.watch('sass/**/*.scss', ['styles']);
    gulp.watch('js/**/*.js', ['scripts']);
    gulp.watch("../**/*.html").on('change', browserSync.reload);
});



gulp.task('static-server', function () {
    var file = new staticServer.Server('./../', { cache: 600 });

    require('http').createServer(function (request, response) {
        request.addListener('end', function () {
            file.serve(request, response);
        }).resume();
    }).listen(8080);
});


// gulp.task('images', function(cb) {
//     gulp.src(['src/**/*.png','src/**/*.jpg','src/**/*.gif','src/**/*.jpeg']).pipe(imageop({
//         optimizationLevel: 5,
//         progressive: true,
//         interlaced: true
//     })).pipe(gulp.dest('images/')).on('end', cb).on('error', cb);
// });
//
// gulp.task('image', function () {
//     gulp.src('src/*.jpg')
//         .pipe(image())
//         .pipe(gulp.dest('../images'));
// });
//

gulp.task('imagesmin', function () {
    gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('../images/'))
        .pipe(notify('Images Min task completed'));
});

gulp.task('autoprefixer', function () {
    gulp.src('../css/style.css')
        .pipe(autoprefixer())
        .pipe(gulp.dest('../css/'))
        // .pipe(notify('Images Min task completed'));
});

