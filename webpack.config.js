const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
    entry:'./src/main.js',
    output:{
        path:path.join( __dirname,'./dist'),
        filename:'js/bundle-[name]-[hash:8].js',
    },
    devServer:{
        contentBase:path.join( __dirname,'./src'),
        port:20085
        // open:true
    },
    resolve:{
        alias:{
            '@':path.resolve('src'),
        },
        extensions:['.js', '.jsx']
    },
    // 加载器
    module:{
        rules:[
            // js,jsx
            {
                test:/\.jsx?$/,
                use:{
                    loader:'babel-loader',
                },
                include:path.resolve(__dirname,'./src')
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
         // 删除dist文件夹
            new CleanWebpackPlugin(),
         // 创建dist文件
            new HtmlWebpackPlugin({
            template:'./src/index.html',
        })
    ]
}