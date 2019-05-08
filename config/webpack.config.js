const path = require('path');
const fs = require('fs');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
let entry = {};

let files = fs.readdirSync('src/components');
console.log(files);
files.forEach(file => {
    if(file.endsWith('.js') || file.endsWith('.jsx')){
        entry[`components/${file}`] = path.resolve(`src/components/${file}`);
    }
})

files = fs.readdirSync('src/vendors');
files.forEach(file => {
    if(file.endsWith('.js') || file.endsWith('.jsx')){
        entry[`vendors/${file}`] = path.resolve(`src/vendors/${file}`);
    }
})

let dirs = fs.readdirSync('src/pages');
dirs.forEach(dir => {
    let pages = fs.readdirSync(`src/pages/${dir}`);
    pages.forEach( page =>{
        if(page.endsWith('.js') || page.endsWith('.jsx')){
           entry[`pages/${dir}/${page}`] = path.resolve(`src/pages/${dir}/${page}`);
        }
    })
})
console.log(entry);


console.log(path.resolve('./index.js'));



module.exports = {
    entry: path.resolve('./index.js'),
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