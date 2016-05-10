const appConf = require('./app.conf.js');
const getLicence = require('./licence');

const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const INDEX_TEMPLATE_PATH = path.resolve(__dirname, './templates/index.html');
const INDEX_PATH = path.resolve(__dirname, '../src/app/index.js');
const VENDOR_PATH = path.resolve(__dirname, '../src/app/vendor.js');
const BUILD_PATH = path.resolve(__dirname, '../build');
const DIST_PATH = path.resolve(__dirname, '../dist');

function getDefaultConfig(options) {
    return {
        entry: {
            app: INDEX_PATH,
            vendor: VENDOR_PATH
        },
        output: {
            path: options.dist ? DIST_PATH : BUILD_PATH,
            filename: '[name].js'
        },
        module: {
            preLoaders: [],
            loaders: [
                {test: /\.js$/, loaders: ['ng-annotate', 'babel'],  exclude: [/node_modules/]},
                {test: /\.scss$/, loaders: ["style", "css", "sass"]}
            ]
        },
        plugins: [
            /*
             * Plugin: BannerPlugin
             * Description: Inject a banner on top of the output file
             * This is used to inject the licence.
             *
             * See: https://webpack.github.io/docs/list-of-plugins.html#bannerplugin
             */
            new webpack.BannerPlugin(getLicence()),

            /*
             * Plugin: CopyWebpackPlugin
             * Description: Copy files and directories in webpack.
             * Copies project static assets.
             *
             * See: https://www.npmjs.com/package/copy-webpack-plugin
             */
            new CopyWebpackPlugin([{
                from: 'src/assets',
                to: 'assets'
            }]),

            /*
             * Plugin: HtmlWebpackPlugin
             * Description: Simplifies creation of HTML files to serve your webpack bundles.
             * This is especially useful for webpack bundles that include a hash in the filename
             * which changes every compilation.
             *
             * See: https://github.com/ampedandwired/html-webpack-plugin
             */
            new HtmlWebpackPlugin({
                title: appConf.title,
                rootElement: appConf.appName,
                template: INDEX_TEMPLATE_PATH
            }),

            /*
             * Plugin: webpack.optimize.CommonsChunkPlugin
             * Description: Identifies common modules and put them into a commons chunk
             *
             * See: https://github.com/webpack/docs/wiki/optimization
             */
            new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.js")
        ],
        babel: {
            presets: ['es2015']
        },
        cache: true,
        devtool: options.devtool,
        debug: options.debug
    };
}

function addDevServerConfig(config) {
    config.devServer = {
        port: appConf.port,
            watchOptions: {
            aggregateTimeout: 300,
                poll: 1000
        },
        outputPath: BUILD_PATH
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

module.exports = (options) => {
    const config = getDefaultConfig(options);

    if(options.devServer) {
        addDevServerConfig(config);
    }

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