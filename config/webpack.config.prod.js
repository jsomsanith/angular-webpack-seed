module.exports = require("./webpack.config.js")({
    env: 'prod',
    devServer: true,
    dist: true,
    minify: true,
    stripComments: true
});