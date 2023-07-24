const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = {
  entry: {
    app: path.resolve(__dirname, "src/index.ts"),
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  resolve: {
    plugins: [new TsconfigPathsPlugin()],
    extensions: [".tsx", ".ts", ".js"],
  },
  context: path.resolve(__dirname, "src"),
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(s[ac]ss)$/i,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: () => [require("autoprefixer")],
              },
            },
          },
          {
            loader: "sass-loader",
          },
        ],
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new ESLintPlugin({ baseConfig: { extends: ".eslintrc.json" } }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve(__dirname, "src/index.html"),
      title: "Monogatari",
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: path.resolve(__dirname, "src/generated/"), to: path.resolve(__dirname, "dist/generated/") }],
    }),
  ],
};
