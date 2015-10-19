'use strict';

// Modules
var gulp = require('gulp');

gulp.task('copy:package', function(){
    return gulp.src('package.json')
        .pipe(gulp.dest('dist'));
});

gulp.task('copy:main', function(){
    return gulp.src('electron/**/*.js')
        .pipe(gulp.dest('dist'));
});
