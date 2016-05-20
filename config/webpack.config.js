const appConf = require('./app.conf.js');
const getLicence = require('./licence');

const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const SassLintPlugin = require('sasslint-webpack-plugin');

const INDEX_TEMPLATE_PATH = path.resolve(__dirname, './templates/index.html');
const INDEX_PATH = path.resolve(__dirname, '../src/app/index.js');
const VENDOR_PATH = path.resolve(__dirname, '../src/app/vendor.js');
const BUILD_PATH = path.resolve(__dirname, '../build');
const DIST_PATH = path.resolve(__dirname, '../dist');

const env = process.env.NODE_ENV;


function getDefaultConfig(options) {
    return {
        entry: {
            vendor: VENDOR_PATH,
            app: INDEX_PATH,
        },
        output: {
            path: options.dist ? DIST_PATH : BUILD_PATH,
            filename: '[name]-[hash].js',
        },
        module: {
            preLoaders: [],
            loaders: [
                { test: /\.js$/, loaders: ['babel'], exclude: [/node_modules/] },
                { test: /\.scss$/, loaders: ['style', 'css', 'sass'] },
                { test: /\.html$/, loaders: ['html'], exclude: INDEX_TEMPLATE_PATH },
                { test: /\.json$/, loader: 'json-loader' },
            ],
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(env),
            }),
        ],
        cache: true,
        devtool: options.devtool,
        debug: options.debug,
    };
}

function addDevServerConfig(config) {
    config.devServer = {
        host: appConf.host,
        port: appConf.port,
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000,
        },
        hot: true,
        inline: false,
        contentBase: config.dist ? DIST_PATH : BUILD_PATH,
        outputPath: config.dist ? DIST_PATH : BUILD_PATH,
    };
}

function addMinifyConfig(config) {
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false,
        },
    }));
}

function addStripCommentsConfig(config) {
    config.module.preLoaders.push({
        test: /\.js$/,
        loader: 'stripcomment',
        exclude: [/node_modules/, /\.spec\.js$/],
    });
}

function addTestConfig(config) {
    config.isparta = {
        embedSource: true,
        noAutoWrap: true,
        babel: {
            presets: ['es2015', 'angular2'],
        },
    };
    config.module.preLoaders.push({
        test: /\.js$/,
        loader: 'isparta',
        exclude: [/node_modules/, /\.spec\.js$/],
    });
}

function addPlugins(config, options) {
    config.plugins.push(
        /*
         * Plugin: CopyWebpackPlugin
         * Description: Copy files and directories in webpack.
         * Copies project static assets.
         *
         * See: https://www.npmjs.com/package/copy-webpack-plugin
         */
        new CopyWebpackPlugin([{
            from: 'src/assets',
            to: 'assets',
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
            rootElement: appConf.rootElement,
            rootModule: appConf.rootModule,
            env: options.env,
            template: INDEX_TEMPLATE_PATH,
        }),

        /*
         * Plugin: BannerPlugin
         * Description: Inject a banner on top of the output file
         * This is used to inject the licence.
         *
         * See: https://webpack.github.io/docs/list-of-plugins.html#bannerplugin
         */
        new webpack.BannerPlugin(getLicence()),

        /*
         * Plugin: webpack.optimize.CommonsChunkPlugin
         * Description: Identifies common modules and put them into a commons chunk
         *
         * See: https://github.com/webpack/docs/wiki/optimization
         */
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendor' })
    );
}

function addLinterConfig(config) {
    config.eslint = { configFile: path.resolve(__dirname, '../.eslintrc') };
    config.module.preLoaders.push({
        test: /src\/.*\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
    });

    config.plugins.push(new SassLintPlugin({
        glob: 'src/app/**/*.s?(a|c)ss',
    }));
}

/*
{
    env: ('dev' | 'prod' | 'test'),     // the environment
    debug: (true | false),              // enable debug
    devtool: 'inline-source-map',       // source map type
    dist: (true | false),               // output in dist folder instead of build folder
    devServer: (true | false),          // configure webpack-dev-server and plugins to generate app
    linter: (true | false),             // enable eslint and sass-lint
    minify: (true | false),             // enable minification/uglification
    stripComments: (true | false),      // remove comments
    test: (true | false)                // configure tests
 }
 */
module.exports = (options) => {
    const config = getDefaultConfig(options);

    if (options.devServer) {
        addDevServerConfig(config);
        addPlugins(config, options);
    }

    if (options.minify) {
        addMinifyConfig(config);
    }

    if (options.stripComments) {
        addStripCommentsConfig(config);
    }

    if (options.test) {
        addTestConfig(config);
    }

    if (options.linter) {
        addLinterConfig(config);
    }

    return config;
};
