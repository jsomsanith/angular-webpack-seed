module.exports = require("./config/webpack.config.js")({
    devtool: "inline-source-map",
    debug: true,
    stripComments: true,
    linter: true
});