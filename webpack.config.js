const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");

// Phaser webpack config
var phaser;
const testMode = process.env.testmode || "0";
switch (testMode) {
  case "0":
    var phaserModule = path.join(__dirname, "/node_modules/phaser/"); // Official released phaser
    phaser = path.join(phaserModule, "src/phaser.js");
    break;
  case "1":
    var phaserModule = path.join(__dirname, "/../gxm-phaser/"); // My tested phaser
    phaser = path.join(phaserModule, "src/phaser.js");
    break;
  case "2":
    var phaserModule = path.join(__dirname, "/../phaser/"); // Lastest phaser
    phaser = path.join(phaserModule, "src/phaser.js");
    break;
  default:
    var phaserModule = path.join(__dirname, testMode); // Other phaser path
    phaser = path.join(phaserModule, "src/phaser.js");
    break;
}

console.log("Phaser path:" + phaser);

const projectMain = process.env.main;
const assetsFolder = process.env.assets || "./assets";
const htmlTemplate = process.env.htmltemplate || "./examples/index.tmpl";

module.exports = {
  mode: "development",
  entry: "./lib/ui/ui-components.ts",
  output: {
    pathinfo: true,
    path: path.resolve(__dirname, "dist"),
    publicPath: "./dist/",
    library: "[name]",
    libraryTarget: "commonjs",
    filename: "index.js",
  },
  watch: true,
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ["babel-loader"],
        include: path.join(__dirname, "src"),
      },
      {
        test: /phaser-split\.js$/,
        use: ["expose-loader?Phaser"],
      },
      {
        test: [/\.vert$/, /\.frag$/],
        use: "raw-loader",
      },
      { test: /\.ts$/, loader: "ts-loader", exclude: "/node_modules/" },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
};
