module.exports = {
  pwa: {
    iconPaths: {
      favicon32: 'favicon.ico',
      favicon16: 'favicon.ico',
      appleTouchIcon: 'favicon.ico',
      maskIcon: 'favicon.ico',
      msTileImage: 'favicon.ico'
    }
  },
  publicPath: './',
  devServer: {
    open: true
  }
  // devServer: {
  //   compress: true,
  //   proxy: {
  //     [process.env.VUE_APP_API]: {
  //       target: 'http://172.165.216.156',
  //       pathRewrite: {
  //         '^/api': ''
  //       },
  //       changeOrigin: true,
  //       logLevel: 'debug'
  //     }
  //   }
  // }
}
