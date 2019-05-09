const path = require('path');
const fs = require('fs');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
let entry = {};

// 组件打包
let files = fs.readdirSync('src/components');
console.log(files);
files.forEach(file => { 
    if(file.endsWith('.js') || file.endsWith('.jsx')){
        entry[`components/${file}`] = path.resolve(`src/components/${file}`);
    }
})

// 第三方库打包
files = fs.readdirSync('src/vendors');
files.forEach(file => {
    if(file.endsWith('.js') || file.endsWith('.jsx')){
        entry[`vendors/${file}`] = path.resolve(`src/vendors/${file}`);
    }
})

// 页面打包
let dirs = fs.readdirSync('src/pages');
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
        }]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebPackPlugin({
            template: './index.html',
        }),
    ],
}