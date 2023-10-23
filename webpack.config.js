const path = require ("path");
const HTMLWebpackPlugin = require ("html-webpack-plugin");
const {CleanWebpackPlugin}=require("clean-webpack-plugin");
const MiniCssExtractPlugin=require("mini-css-extract-plugin");
const CssMinimizerPlugin=require("css-minimizer-webpack-plugin");
const TerserPlugin=require("terser-webpack-plugin");
const isProduct=process.env.NODE_ENV === "production";
module.export = {
    entry: './src/index.js',
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash].js'
    },
    plugins : [
        new HTMLWebpackPlugin({
            template: './src/index.html'
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css'
        })
    ],
    module : {
        rules : [
            {
                test:/\.s[ac]ss$/,
                use : [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react']
                    }
                },
                exclude: /node_modules/
            }
        ]
    },
    optimization: {
        minimizer: isProduct ? [new CssMinimizerPlugin(), new TerserPlugin()] : []
    },
    devServer:{
        watchFiles:path.resolve(__dirname, 'src'),
        port: 3000
    }
}