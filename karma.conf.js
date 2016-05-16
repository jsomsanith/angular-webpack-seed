var argv = require('yargs').argv;
var webpackConfig = require('./config/webpack.config.test.js');

module.exports = function (config) {
    config.set({
        singleRun: !argv.auto,
        autoWatch: !!argv.auto,

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',
        files: [
            './node_modules/reflect-metadata/Reflect.js',
            './node_modules/zone.js/dist/zone.js',
            './node_modules/zone.js/dist/long-stack-trace-zone.js',
            './node_modules/zone.js/dist/jasmine-patch.js',
            './node_modules/zone.js/dist/async-test.js',
            './node_modules/@angular/core/testing.js',
            './node_modules/@angular/platform-browser-dynamic/testing.js',
            'src/**/*.spec.js'
        ],
        exclude: [],

        frameworks: ['jasmine'],
        browsers: ['PhantomJS'],

        preprocessors: {
            'src/**/*.js': ['webpack']
        },

        reporters: ['progress', 'coverage'],

        port: 9876,

        colors: true,

        logLevel: config.LOG_WARN,

        coverageReporter: {
            type: 'html',
            dir: 'coverage/'
        },

        webpack: webpackConfig
    })
};