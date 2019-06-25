const path = require('path');
const fs = require('fs');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
let entry = {};

let files;
let dirs

// 组件打包

try{
    dirs = fs.readdirSync('src/components');
}catch(e){
    fs.mkdirSync('src/components');
    dirs = fs.readdirSync('src/components');
}
dirs.forEach(dir => {
    let pages = fs.readdirSync(`src/components/${dir}`);
    pages.forEach( page =>{
        if(page.endsWith('.js') || page.endsWith('.jsx')){
            entry[`components/${dir}/${page}`] = path.resolve(`src/components/${dir}/${page}`);
        }
    })
})

// 第三方库打包
try{
  files = fs.readdirSync('src/vendors');
}catch(e){
  fs.mkdirSync('src/vendors');
  files = fs.readdirSync('src/vendors');
}
files.forEach(file => {
    if(file.endsWith('.js') || file.endsWith('.jsx')){
        entry[`vendors/${file}`] = path.resolve(`src/vendors/${file}`);
    }
})

// 页面打包
try{
  dirs = fs.readdirSync('src/pages');
}catch(e){
  fs.mkdirSync('src/pages');
  dirs = fs.readdirSync('src/pages');
}
dirs.forEach(dir => {
    let pages = fs.readdirSync(`src/pages/${dir}`);
    pages.forEach( page =>{
        if(page.endsWith('.js') || page.endsWith('.jsx')){
           entry[`pages/${dir}/${page}`] = path.resolve(`src/pages/${dir}/${page}`);
        }
    })
})

module.exports = {
    entry: entry,
    output: {
        filename: '[name].[chunkhash].js',
        path: path.resolve('./dist')
    },
    module: {
        rules: [{
            test: /(\.jsx|\.js)$/,
            use: {
                loader: "babel-loader",
            },
            exclude: /node_modules/
        },{
            test: /\.css$/,
            use: ["style-loader", "css-loader"]
        },{
            test: /(\.styl|\.stylus)$/,
            use: ["style-loader", "css-loader", "stylus-loader"]
        }]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebPackPlugin({
            template: './index.html',
            // 这里chunks的名字，参照 entry里面的 key, 表示 html 只引入指定 js/jsx
            chunks: ['pages/index/main.jsx']
        }),
    ],
}