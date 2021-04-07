const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
    publicPath:'./', //基础路径
    outputDir:'dist',
    assetsDir:'static',
    lintOnSave: process.env.NODE_ENV === 'development',
    productionSourceMap:false, //生产环境是否生成sourceMap文件
    devServer: {
        port: 8899,
        open: true,
        overlay: {
          warnings: false,
          errors: true
        },
        compress:true, //gzip?
    },
    configureWebpack: {
      // provide the app's title in webpack's name field, so that
      // it can be accessed in index.html to inject the correct title.
      name: 'testPro',
      resolve: {
        alias: {
          '@': resolve('src')
        }
      }
    }
}