var appConf = require('./app.conf.js');
var getLicence = require('./licence');

var path = require('path');
var webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');

function getDefaultConfig(options) {
    return {
        entry: path.resolve(__dirname, '../src/app/index.js'),
        output: {
            path: path.resolve(__dirname, '../build'),
            filename: 'app.js'
        },
        module: {
            preLoaders: [],
            loaders: [
                {test: /\.js$/, loaders: ['ng-annotate', 'babel'],  exclude: [/node_modules/]},
                {test: /\.scss$/, loaders: ["style", "css", "sass"]}
            ]
        },
        plugins: [
            new webpack.BannerPlugin(getLicence()),
            new HtmlWebpackPlugin({
                title: appConf.title,
                rootElement: appConf.appName,
                template: 'config/templates/index.html'
            })
        ],
        babel: {
            presets: ['es2015']
        },
        devtool: options.devtool,
        debug: options.debug
    };
}

function addMinifyConfig(config) {
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }));
}

function addStripCommentsConfig(config) {
    config.module.preLoaders.push({test: /\.js$/, loader: "stripcomment", exclude: [/node_modules/, /\.spec\.js$/]});
}

function addTestConfig(config) {
    config.isparta = {
        embedSource: true,
        noAutoWrap: true,
        babel: {
            presets: ['es2015']
        }
    };
    config.module.preLoaders.push({test: /\.js$/, loader: 'isparta', exclude: [/node_modules/, /\.spec\.js$/]});
}

function addLinterConfig(config) {
    config.eslint = {configFile: '.eslintrc'};
    config.module.preLoaders.push({
        test: /src\/.*\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
    });
}

module.exports = function(options) {
    var config = getDefaultConfig(options);

    if(options.minify) {
        addMinifyConfig(config);
    }

    if(options.stripComments) {
        addStripCommentsConfig(config);
    }

    if(options.test) {
        addTestConfig(config);
    }

    if(options.linter) {
        addLinterConfig(config);
    }

    return config;
};