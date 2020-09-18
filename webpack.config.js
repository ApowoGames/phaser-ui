const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const ConfigWebpackPlugin = require("config-webpack");
const TerserPlugin = require("terser-webpack-plugin");
// Phaser webpack config
// var phaser;
// const testMode = process.env.testmode || "0";
// switch (testMode) {
//   case "0":
//     var phaserModule = path.join(__dirname, "/node_modules/phaser/"); // Official released phaser
//     phaser = path.join(phaserModule, "src/phaser.js");
//     break;
//   case "1":
//     var phaserModule = path.join(__dirname, "/../gxm-phaser/"); // My tested phaser
//     phaser = path.join(phaserModule, "src/phaser.js");
//     break;
//   case "2":
//     var phaserModule = path.join(__dirname, "/../phaser/"); // Lastest phaser
//     phaser = path.join(phaserModule, "src/phaser.js");
//     break;
//   default:
//     var phaserModule = path.join(__dirname, testMode); // Other phaser path
//     phaser = path.join(phaserModule, "src/phaser.js");
//     break;
// }

// console.log("Phaser path:" + phaser);

const projectMain = process.env.main;
const assetsFolder = process.env.assets || "./assets";
const htmlTemplate = process.env.htmltemplate || "./examples/index.tmpl";

module.exports = {
  mode: "none",
  entry: { apowophaserui: "./lib/ui/ui-components.ts" },
  output: {
    pathinfo: true,
    path: path.resolve(__dirname, "dist"),
    library: "apowophaserui",
    libraryTarget: "umd",
    filename: "apowophaserui.js",
    umdNamedDefine: true
  },
  watch: true,
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ["babel-loader"],
        include: path.join(__dirname, "lib"),
      },
      {
        test: [/\.vert$/, /\.frag$/],
        use: "raw-loader",
      },
      { test: /\.ts$/, loader: "ts-loader", exclude: ["/node_modules/", "/lib/"] },
    ],
  },
  resolve: {
    extensions: [".js"],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        sourceMap: true,
        terserOptions: {
          parrallel: 4,
          ecma: undefined,
          warnings: false,
          parse: {},
          compress: {},
          mangle: true, // Note `mangle.properties` is `false` by default.
          module: false,
          output: null,
          toplevel: false,
          nameCache: null,
          ie8: false,
          keep_classnames: true,
          keep_fnames: true,
          safari10: false,
        },
      }),
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      WEBGL_RENDERER: true, // I did this to make webpack work, but I'm not really sure it should always be true
      CANVAS_RENDERER: true, // I did this to make webpack work, but I'm not really sure it should always be true
    })]
};
