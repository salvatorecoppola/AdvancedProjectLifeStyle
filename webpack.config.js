const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Dotenv = require('dotenv-webpack');
const autoprefixer = require('autoprefixer')
const sass = require('sass');



module.exports = {
    mode : 'development',
    entry : {
        main : path.resolve(__dirname, 'src/mappingdata.js'),
        second : path.resolve(__dirname, 'src/autocomplete.js'),
        
    },
    output : {
        path : path.resolve(__dirname, 'dist'),
        filename: '[name][contenthash].js',
        clean: true,
        assetModuleFilename: '[name] [ext]',
    },
    devtool: 'source-map',
    devServer: {
        static:{
            directory: path.resolve(__dirname,'dist')
        },
        port: 8080,
        open: true,
        hot: true,
        compress: true,
        historyApiFallback: true,
    },
    
    module: {
        rules: [
            {
                
                test:/\.(scss)$/,
                use: [
                    {
                    loader: 'style-loader',
                    },
                    {
                    loader:'css-loader',
                    },
                    {
                    loader:'sass-loader',
                    },
                    {
                    loader:'postcss-loader',
                    options: {
                        postcssOptions: {
                          plugins: () => [
                            autoprefixer
                          ]
                        }
                      }
                    },
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options:{
                        presets: ['@babel/preset-env'],
                    },
                },
            
        },
        {
            test:/\.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset/resource'
        }

        ],
    },
    plugins: [ 
        new Dotenv(),
        new HtmlWebpackPlugin({
        title: 'Webpack App',
        filename: 'index.html',
        template: 'src/template.html',
        inject:'head'
    }), 
   ],
   
}