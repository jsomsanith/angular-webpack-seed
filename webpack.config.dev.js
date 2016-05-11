module.exports = require("./config/webpack.config.js")({
    env: 'dev',
    debug: true,
    devServer: true,
    devtool: "inline-source-map",
    linter: true,
    stripComments: true
});