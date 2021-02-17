
 const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
  transpileDependencies: ["vuetify"],

  assetsDir:'static',
   parallel:false,
  publicPath:'./',
  //  chainWebpack: config => {
  //   config
  //   .plugin('webpack-bundle-analyzer')
  //   .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
  //   }
  productionSourceMap: false,
  // configureWebpack: {
  //    plugins: [
  //    new CompressionPlugin({
  //        /* [file]被替换为原始资产文件名。
  //           [path]替换为原始资产的路径。
  //           [dir]替换为原始资产的目录。
  //           [name]被替换为原始资产的文件名。
  //           [ext]替换为原始资产的扩展名。
  //           [query]被查询替换。*/
  //        filename: '[path].gz[query]',
  //        //压缩算法
  //        algorithm: 'gzip',
  //        //匹配文件
  //        test: /\.js$|\.css$|\.html$/,
  //        //压缩超过此大小的文件,以字节为单位
  //        threshold: 10240,
  //        minRatio: 0.6,
  //        //删除原始文件只保留压缩后的文件
  //        deleteOriginalAssets: false
  //      })
  //    ]
  //  }
  configureWebpack: {
    plugins: [
    new CompressionPlugin({
        filename: "[path].br[query]",
        algorithm: "brotliCompress",
        test: /\.(js|css|html|svg)$/,
        compressionOptions: { level: 11 },
        threshold: 10240,
        minRatio: 0.8,
        deleteOriginalAssets: false
      })
    ]
  }

 
};
