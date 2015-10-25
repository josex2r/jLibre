'use strict';

// Modules
var gulp = require('gulp');
var exec = require('child_process').exec;

gulp.task('install:babel', function(cb){
    exec('npm install --prefix ./dist babel-runtime', function (err) {
    cb(err);
  });
});
