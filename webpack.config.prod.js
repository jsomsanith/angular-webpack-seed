module.exports = require("./config/webpack.config.js")({
    env: 'prod',
    devServer: true,
    dist: true,
    minify: true,
    stripComments: true
});