var del = require('del');
var gulp = require('gulp');
var peg = require('gulp-peg');
var rename = require('gulp-rename');
var jasmine = require('gulp-jasmine');
var reporter = require('jasmine-console-reporter');

gulp.task('travis', ['default']);

gulp.task('default', ['build', 'test']);

gulp.task('build', ['clean'], function(){
    gulp.src('grammar/ingreedy.peg')
        .pipe(peg({format: "commonjs"}).on("error", function(error){ console.log(error)}))
        .pipe(rename('parser.js'))
        .pipe(gulp.dest('src'))
})

gulp.task('clean', function(){
    del.sync(['src/parser.js']);
})

gulp.task('test', ['build'], function(){
    gulp.src('spec/*.js')
        .pipe(jasmine({
            reporter: new reporter({verbosity: true, colors: true})
        }))
})
// module.exports = function(grunt) {
//   'use strict';

//   // Project configuration.
//   grunt.initConfig({
//     jasmine : {
//       src : 'src/**/*.js',
//       options : {
//         specs : 'spec/**/*.js'
//       }
//     },
//     peg: {
//       ingreedy: {
//         src: 'grammar/ingreedy.peg',
//         dest: 'src/parser.js',
//         options: { format: "commonjs" }
//       }
//     },
//     watch: {
//       grammar: {
//         files: ['grammar/*.peg'],
//         tasks: ['build', 'test']
//       },
//       test: {
//         files: ['spec/**/*.js'],
//         tasks: ['test']
//       }
//     }
//   });

//   grunt.loadNpmTasks('grunt-contrib-jasmine');
//   grunt.loadNpmTasks('grunt-contrib-watch');
//   grunt.loadNpmTasks('grunt-peg');

//   grunt.registerTask('test', ['jasmine']);
//   grunt.registerTask('build', ['peg']);

//   grunt.registerTask('travis', ['build', 'test']);
//   grunt.registerTask('default', ['build', 'test']);
// };
