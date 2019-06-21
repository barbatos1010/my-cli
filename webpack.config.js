
const path = require('path');  //自动路径生成

/************开发环境插件************/
const webpack = require('webpack');  //打包机
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');   //删除之前打包的文件
const HtmlWebpackPlugin = require('html-webpack-plugin');   //生成html的插件

module.exports = {
    mode: 'development',
    devtool:"inline-source-map",
    entry:{//入口配置
        app:"./src/index.js",
    },
    devServer:{//热重载需要的文件
        contentBase:"./dist",
        hot:true,
    },
    module:{
        //多个加载器时使用use,单个加载器时使用loader
        rules:[
            {//解析.vue文件
                test:/\.vue$/,
                loader:'vue-loader'
            },{//配置样式文件loader
                test:/\.css$/,
                use:['style-loader','vue-style-loader','css-loader']
            }
        ]
    },
    plugins:[
        new VueLoaderPlugin(), //.vue文件的加载器

        new CleanWebpackPlugin(),  

        new HtmlWebpackPlugin({
            template:'./index.html',
            title:'Vue'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ],
    output:{//打包后文件配置
        filename:'[name].bundle.js',
        path:path.resolve(__dirname,'dist')
    },
    resolve:{//设置各种简写
        //引入文件时不用写后缀
        extensions:['.js','.vue'],
        alias:{//路径别名
           '@':path.resolve(__dirname,'src')
        }
    }
}
