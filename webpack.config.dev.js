module.exports = require("./config/webpack.config.js")({
    devServer: true,
    devtool: "inline-source-map",
    debug: true,
    stripComments: true,
    linter: true
});