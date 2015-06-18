module.exports = function(config) {
    config.set({
        autoWatch: false,
        browsers: ['PhantomJS'],
        files: [
            {pattern: './test/stub/ui-binding-stub.js', included: false},
            {pattern: './test/stub/writing-system-switcher-stub.js', included: false},
            {pattern: './public_html/js/ui-binding.js', included: false},
            {pattern: './public_html/js/writing-system-switcher.js', included: false},
            {pattern: './public_html/js/tasks.js', included: false},
            {pattern: './public_html/js/session-mem.js', included: false},
            {pattern: './public_html/js/active-tasks.js', included: false},
            {pattern: './public_html/js/session-tasks.js', included: false},
            {pattern: './public_html/js/app.js', included: false},
            {pattern: './test/tasks-test.spec.js', included: false},
            {pattern: './test/active-tasks-test.spec.js', included: false},
            {pattern: './test/session-tasks-test.spec.js', included: false},
            {pattern: './test/first-test.spec.js', included: false},
            {pattern: './test/app-test.spec.js', included: false},
            {pattern: './test/test-main.js', included: true},

            // libraries
            {pattern: './node_modules/requirejs/require.js', included:false, watching: false},
            {pattern: './node_modules/karma-sinon-chai/node_modules/sinon-chai/lib/sinon-chai.js', included:false, watching: false}
        ],
        frameworks: ["jasmine", 'requirejs'],
        preprocessors : {
            './public_html/js/app.js': 'coverage',
            './public_html/js/session-mem.js': 'coverage',
            './public_html/js/active-tasks.js': 'coverage',
            './public_html/js/session-tasks.js': 'coverage',
            './public_html/js/tasks.js': 'coverage'
        },
        reporters: ["progress", "beep", 'coverage'],
        coverageReporter : {
            type : 'html',
            dir : 'coverage/'
        },
        singleRun: true,
        plugins : [
            'karma-phantomjs-launcher',
            'karma-beep-reporter',
            'karma-jasmine',
            'karma-requirejs',
            'karma-coverage'
        ]
    });
};
