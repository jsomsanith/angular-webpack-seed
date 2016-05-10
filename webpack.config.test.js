module.exports = require("./config/webpack.config.js")({
    devtool: "inline-source-map",
    debug: true,
    test: true,
    linter: true
});