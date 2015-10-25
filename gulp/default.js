'use strict';

// Modules
var gulp = require('gulp');

gulp.task('default', ['copy:package', 'copy:main', 'install:babel']);
