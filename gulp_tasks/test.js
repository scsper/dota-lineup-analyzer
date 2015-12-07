var gulp = require('gulp');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');
var runSequence = require('run-sequence');
var path = require('path');
var Instrumenter = require('isparta').Instrumenter;
var server = require('karma').server;

var COVERAGE_DIR = './coverage';
var JSON_COVERAGE_DIR = './coverage/json';

gulp.task('test:unit', function(cb) {
    gulp.src([
        '!**/node_modules/**',
        // cover all source files
        'src/**/*.js{,x}',
        // exclude test files from coverage
        '!**/_{browser,unit,integration}_/**/*_test.js{,x}',
    ])
        .pipe(istanbul({
            instrumenter: Instrumenter,
            // istanbul does not include files that are not required in the coverage report.
            // this will include them by default.
            includeUntested: true
        }))
        .pipe(istanbul.hookRequire())
        .on('finish', function() {
            gulp.src(['test/setup/unit.js', '**/_unit_/*_test.js'])
                .pipe(mocha({
                    reporter: 'spec'
                }))
                .pipe(istanbul.writeReports({
                    dir: COVERAGE_DIR,
                    reporters: ['json', 'text'],
                    reportOpts: {
                        json: {dir: JSON_COVERAGE_DIR, file: 'unit.json'}
                    }
                })).on('end', cb);
        });
});

gulp.task('test:integration', function(cb) {
    gulp.src([
        '!**/node_modules/**',
        // cover all source files
        'src/**/*.js{,x}',
        // exclude test files from coverage
        '!**/_{browser,unit,integration}_/**/*_test.js{,x}',
    ])
        .pipe(istanbul({
            instrumenter: Instrumenter,
            // istanbul does not include files that are not required in the coverage report.
            // this will include them by default.
            includeUntested: true
        }))
        .pipe(istanbul.hookRequire())
        .on('finish', function() {
            gulp.src(['test/setup/integration.js', '**/_integration_/*_test.js'])
                .pipe(mocha({
                    reporter: 'spec'
                }))
                .pipe(istanbul.writeReports({
                    dir: COVERAGE_DIR,
                    reporters: ['json', 'text'],
                    reportOpts: {
                        json: {dir: JSON_COVERAGE_DIR, file: 'integration.json'}
                    }
                })).on('end', cb);
        });
});

gulp.task('test:browser', function(cb) {
    var configFile = path.resolve(__dirname, '../config/karma.conf.js');

    server.start({
        configFile: configFile,
        // singleRun: true
    }, function(code) {
        console.log('Karma exited with code: ', code);
        if (code !== 0) {
            throw new Error('Karma tests failed');
        }
        cb();
    });
});

gulp.task('test', function(cb) {
    runSequence('test:unit', 'test:integration', 'merge_coverage', cb);
});
