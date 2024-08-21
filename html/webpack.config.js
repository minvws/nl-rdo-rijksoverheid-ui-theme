import CopyPlugin from "copy-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import RemoveEmptyScriptsPlugin from "webpack-remove-empty-scripts";

export default {
  mode: "development",
  context: import.meta.dirname,
  entry: {
    accordion: "@minvws/manon/accordion.js",
    expandoRows: "@minvws/manon/expando-rows.js",
    filters: "@minvws/manon/filters.js",
    formHelp: "@minvws/manon/form-help.js",
    collapsible: "@minvws/manon/collapsible.js",
    sidemenu: "@minvws/manon/sidemenu.js",
    main: "./main.scss",
  },
  output: {
    path: import.meta.dirname + "/dist",
    filename: "js/[name].js",
  },
  optimization: {
    removeEmptyChunks: true,
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        type: "asset/resource",
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: false,
            },
          },
          {
            loader: "css-loader",
            options: {
              /**
               *
               * @param {string} url
               */
              url: {
                filter: (url) => !url.startsWith("/"),
              },
              sourceMap: true,
              importLoaders: 2,
            },
          },
          {
            loader: "resolve-url-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(ico|svg|jpg|png)(\?v=\d+\.\d+\.\d+)?$/,
        type: "asset/resource",
        generator: {
          filename: "img/[name][ext]",
        },
      },
      {
        test: /(ro-icons-3\.6)\.(svg)(\?v=\d+\.\d+\.\d+)?$/,
        type: "asset/resource",
        generator: {
          filename: "fonts/[name][ext]",
        },
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        type: "asset/resource",
        generator: {
          filename: "fonts/[name][ext]",
        },
      },
    ],
  },
  plugins: [
    new RemoveEmptyScriptsPlugin({ verbose: true }),
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "../img/**/*",
          to: "img/[name][ext]",
        },
      ],
    }),
  ],
};
