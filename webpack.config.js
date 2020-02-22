const path = "/Library/WebServer/Documents/php/Max_vietnam/";
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

// const env = process.env.NODE_ENV
//
//   const config = {
//    mode: env || 'development'
// }

module.exports = (env, options) => {
    console.log(`This is the Webpack 4 'mode': ${options.mode}`);
    return {

    // module.exports = {
      // entry: "./src/assets/js/**/*.js",
      context: path,
      entry: "./src/js/app.js",
      // watch: true,
      output: {
        path: path + "dist/js",
        chunkFilename: "bundle.js?v=[contenthash]",
        filename: "bundle.js?v=[contenthash]"
      },
      optimization: {
        minimizer: [new UglifyJsPlugin(
          {sourceMap: false}
        )],
      },
      devtool: "cheap-eval-source-map",
      // resolve: {
      //     alias: {
      //         vue: 'vue/dist/vue.js'
      //     },
      // },
      resolve: {
        alias: {
          jQuery: "jquery/src/jquery"
        }
      },
      node: {
        fs: "empty"
      },
      watch: options.mode === "development" ? true : false

      // For modernizr issue (closure issue with this.document)
      // Seehttps://github.com/webpack/webpack/issues/512
      /*
      module: {
        rules: [
          {
            test: require.resolve("modernizr"),
            // test: /[\/\\]node_modules[\/\\]modernizer[\/\\]index\.js$/,
            // test: require.resolve('./src/js/app.js'),
            // test: /[\\\/]bower_components[\\\/]modernizr[\\\/]modernizr\.js$/,
            // use: "imports?this=>window!exports?window.Modernizr"
            // use: "imports-loader?$=jquery,this=>window!./src/js/app.js"
            // loader: "imports?this=>window!exports?window.Modernizr"
            use: [
              'expose-loader?Modernizr',
              'imports-loader?this=>window,jQuery=jquery,$=jquery!exports-loader?window.Modernizr'
            ]
          }
        ]
      }
      */

    }
}

/*
module: {
    ...
    loaders: [
        ...
        { test: /[\\\/]bower_components[\\\/]modernizr[\\\/]modernizr\.js$/,
            loader: "imports?this=>window!exports?window.Modernizr" }
        ...
    ]
}
*/