
const path = require('path')
const CompressionWebpackPlugin = require('compression-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const isProd = process.env.NODE_ENV === 'production'
const name = process.env.VUE_APP_BASE_NAME || 'Vue Element Admin'

module.exports = {
  productionSourceMap: false,
  publicPath: './',
  outputDir: 'dist',
  devServer: {
    open: true,
    port: 2022,
    before:
      process.env.NODE_ENV === 'development'
        ? require('./mock/mock-server.js')
        : ''
    // proxy: {
    //   '/services': {
    //     target: 'http://192.168.204.204:7025',
    //     changeOrigin: true
    //     // pathRewrite: {
    //     //   '^/services': ''
    //     // }
    //   }
    // }
  },
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    sourceMap: false,
    loaderOptions: {
      sass: {
        prependData: `@import "@/styles/mixin.scss";`
      }
    }
  },
  configureWebpack: {
    name: name,
    resolve: {
      alias: {
        '@': resolve('src'),
        'api': resolve('src/api'),
        'assets': resolve('src/assets'),
        'components': resolve('src/components'),
        'router': resolve('src/router'),
        'store': resolve('src/store'),
        'styles': resolve('src/styles'),
        'utils': resolve('src/utils'),
        'views': resolve('src/views')
      }
    },
    // 警告 webpack 的性能提示
    performance: {
      hints: 'warning',
      // 入口起点的最大体积
      maxEntrypointSize: 50000000,
      // 生成文件的最大体积
      maxAssetSize: 30000000,
      // 只给出 js 文件的性能提示
      assetFilter: function(assetFilename) {
        return assetFilename.endsWith('.js')
      }
    }
  },
  chainWebpack(config) {
    // 设置开发环境sourceMap
    config.when(!isProd, config => config.devtool('cheap-source-map'))
    // 生产环境分割代码
    config.when(isProd, config => {
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial'
          },
          commons: {
            name: 'chunk-commons',
            test: /[\\/]src[\\/]js[\\/]/,
            minChunks: 2, //  minimum common number
            priority: 5,
            reuseExistingChunk: true
          }
        }
      })

      config.plugin('CompressionWebpackPlugin').use(CompressionWebpackPlugin, [
        {
          algorithm: 'gzip',
          test: /\.js$|\.css/, // 匹配文件名
          threshold: 10240, // 对超过10k的数据压缩
          minRatio: 0.8
        }
      ])
    })
  }
}
