var del = require('del');
var gulp = require('gulp');
var peg = require('gulp-peg');
var rename = require('gulp-rename');
var jasmine = require('gulp-jasmine');
var reporter = require('jasmine-console-reporter');
var webpack = require('webpack');
var webpackStream = require('webpack-stream');

function clean() {
    return del(['src/parser.js']);
}

function build_grammar() {
    return gulp.src('grammar/ingreedy.peg')
        .pipe(peg({format: "commonjs"}).on("error", function(error){ console.log(error)}))
        .pipe(rename('parser.js'))
        .pipe(gulp.dest('src'))
}
var build = gulp.series(clean, build_grammar);

function unit_test() {
    return gulp.src('spec/*.js')
        .pipe(jasmine({
            reporter: new reporter({verbosity: true, colors: true})
        }))
}
var test = gulp.series(build, unit_test)

function webpackage() {
    return gulp.src('src/parser.js')
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
}
var webpack = gulp.series(build, test, webpackage);

exports.clean = clean;
exports.build = build;
exports.test = test;
exports.webpack = webpack;
exports.default = gulp.series(build, test, webpack);
