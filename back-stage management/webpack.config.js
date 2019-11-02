const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
module.exports ={
    entry:'./src/main.js',//入口
    output:{//打包压缩后的路径
        path:path.join(__dirname,'./dist'),
        filename:'js/bundle-[name]-[hash:5].js',
    },
    devServer:{//服务器
        contentBase:path.join(__dirname,'./src'),
        port:3006
    },
    resolve:{//路径配置
       alias:{
           '@':path.resolve('src'),
       },
       extensions:['.js','.jsx']
    },
    module:{
        rules:[
            {
                test:/\.jsx?$/,
                use:{
                    loader:'babel-loader',
                },
                include:path.resolve(__dirname,'./src')//该路径下的所有服务条件的文件都会被编译
            },
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            },
            {
                test:/\.scss$/,
                use:['style-loader','css-loader','sass-loader']
            }
        ]
    },
    plugins:[
        new CleanWebpackPlugin(),//删除dist文件夹
        new HtmlWebpackPlugin({//创建dist文件
            template:'./src/index.html'
        })
    ]

}