'use strict';

// Modules
var gulp = require('gulp');

gulp.task('watch', function(){
    return gulp.watch('electron/**/*', ['default']);
});
