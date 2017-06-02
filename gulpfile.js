var del = require('del');
var gulp = require('gulp');
var peg = require('gulp-peg');
var rename = require('gulp-rename');
var jasmine = require('gulp-jasmine');
var reporter = require('jasmine-console-reporter');
var webpack = require('webpack');
var webpackStream = require('webpack-stream');

gulp.task('travis', ['default']);

gulp.task('default', ['build', 'test', 'webpack']);

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

gulp.task('webpack', ['build', 'test'], function(){
    gulp.src('src/parser.js')
        .pipe(webpackStream({
            output: {
                filename: 'Ingreedy.js',
                libraryTarget: 'var',
                library: 'Ingreedy'
            },
            plugins: [
                new webpack.optimize.UglifyJsPlugin({
                    compress: {
                        warnings: false,
                    },
                    output: {
                        comments: false,
                    },
                }),
            ]
         }))
        .pipe(gulp.dest('dist'));
});
