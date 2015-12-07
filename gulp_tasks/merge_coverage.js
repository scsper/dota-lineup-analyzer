var gulp = require('gulp');
var glob = require('glob');
var path = require('path');
var istanbul = require('istanbul');
var gutil = require('gulp-util');

var FINAL_COVERAGE_DIR = path.resolve(__dirname, '../coverage');
var FINAL_OUTPUT_FORMATS = ['lcov', 'json'];

gulp.task('merge_coverage', function(cb) {
    var PATTERN = path.join(__dirname, '../coverage/json/*.json');
    var collector = new istanbul.Collector();
    var reporter = new istanbul.Reporter(null, FINAL_COVERAGE_DIR);
    var reports = glob.sync(PATTERN);

    gutil.log('[merge_coverage]', 'collecting reports from: ' + PATTERN);

    if (!reports.length) {
        throw new Error('No report files found. pattern: ' + PATTERN);
    }

    reports.forEach(function(file) {
        var coverageObject = require(file);
        gutil.log('[merge_coverage]', 'Adding file: ' + file);
        collector.add(coverageObject);
    });

    reporter.addAll(FINAL_OUTPUT_FORMATS);

    reporter.write(collector, false, function() {
            gutil.log('[merge_coverage]', 'report is saved to: ', FINAL_COVERAGE_DIR);
            cb();
    });
});
