var argv = require('yargs').argv;
var webpackConfig = require('./config/webpack.config.test.js');

module.exports = function (config) {
    config.set({
        singleRun: !argv.auto,
        autoWatch: !!argv.auto,

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',
        files: [
            // polyfills
            './node_modules/reflect-metadata/Reflect.js',
            './node_modules/babel-polyfill/browser.js',

            // zones
            './node_modules/zone.js/dist/zone.js',
            './node_modules/zone.js/dist/long-stack-trace-zone.js',
            './node_modules/zone.js/dist/jasmine-patch.js',
            './node_modules/zone.js/dist/async-test.js',
            './node_modules/zone.js/dist/fake-async-test.js',

            // Rx
            { pattern: 'node_modules/rxjs/**/*.js', included: false, watched: false },

            // angular
            { pattern: './node_modules/@angular/**/*.js', included: false, watched: true },

            // tests
            './config/test-env.js',
        ],
        exclude: [
            './src/app/store/configureStoreDev.js',
        ],

        frameworks: ['jasmine'],
        browsers: ['PhantomJS'],

        preprocessors: {
            './config/test-env.js': ['webpack'],
            './src/**/*.js': ['webpack'],
        },

        reporters: ['progress', 'coverage'],

        port: 9876,

        colors: true,

        logLevel: config.LOG_WARN,

        coverageReporter: {
            type: 'html',
            dir: 'coverage/',
        },

        webpack: webpackConfig,
    });
};
