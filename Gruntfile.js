module.exports = function(grunt) {
    grunt.initConfig({
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec'
                },
                require: [
                    function() {
                        var unitSetup = require('./test/setup/unit.js');

                        unitSetup();
                    }
                ],
                src: ['src/**/*_test.js']
            }
        }
    });

    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.registerTask('test', ['mochaTest']);
};
