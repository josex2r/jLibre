'use strict';

// Modules
var gulp = require('gulp');
var babel = require('gulp-babel');

gulp.task('copy:package', function(){
    return gulp.src('package.json')
        .pipe(gulp.dest('dist'));
});

gulp.task('copy:main', function(){
    return gulp.src('electron/**/*.js')
        .pipe(babel({
            blacklist: ['strict'],
            optional: ['runtime']
        }))
        .pipe(gulp.dest('dist'));
});
