// Gulpfile.js
var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var path = require('path');

var paths = {
    es6: ['src/server/**/*.js'],
    es5: 'compiled',
    // Must be absolute or relative to source map
    sourceRoot: path.join(__dirname, 'src'),
};

gulp.task('babel:server', function () {
    return gulp.src(paths.es6)
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(sourcemaps.write('.', { sourceRoot: paths.sourceRoot }))
        .pipe(gulp.dest(paths.es5));
});

gulp.task('server', function() {
    nodemon({
            script: 'index.js',
            ext: 'jsx js',
            ignore: ['public', paths.es5],
            tasks: ['babel:server', 'webpack']
        }).on('restart', function() {
            console.log('restarted!')
        });
});
