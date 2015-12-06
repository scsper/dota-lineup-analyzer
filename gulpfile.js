var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var nodemon = require('gulp-nodemon');
var sass = require('gulp-sass');

var path = require('path');

var paths = {
    es6: ['src/**/*.js'],
    es5: 'compiled',
    css: 'css',
    // Must be absolute or relative to source map
    sourceRoot: path.join(__dirname, 'src'),
};

gulp.task('babel', function () {
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
        ext: 'js jsx scss',
        ignore: [paths.es5, paths.css],
        tasks: ['babel', 'sass']
    }).on('restart', function() {
        console.log('restarted!')
    });
});

gulp.task('sass', function () {
  gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(paths.css));
});

gulp.task('default', ['server']);
