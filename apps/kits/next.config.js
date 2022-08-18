/** @type {import('next').NextConfig} */
const compose = require('next-compose-plugins')
const { i18n } = require('./next-i18next.config')
const withBundleAnalyzer = require('@next/bundle-analyzer')({ enabled: process.env.ANALYZE == 'true' })

let removeConsole = []

if (process.env.NODE_ENV === 'production') {
  removeConsole.push("transform-remove-console")
}

const config = {
  reactStrictMode: true,
  i18n,
  productionBrowserSourceMaps: false, //生产环境source map
  compiler: {
    styledComponents: true,
  },
  poweredByHeader: false,
  typescript: {
    //构建时忽略ts错误
    ignoreBuildErrors: false,
  },
  eslint: {
    // 构建时忽略eslint错误
    ignoreDuringBuilds: false,
  },
  build: {
    babel: {
      'plugins': removeConsole
    }
  },
  //自定义webpack
  /*
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.mdx/,
      use: [
        options.defaultLoaders.babel,
        {
          loader: '@mdx-js/loader',
          options: pluginOptions.options,
        },
      ],
    })
    return config
  },*/
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.web3kit.app/:path*', // Proxy to Backend
      },
    ]
  },
}

module.exports = compose(
  [withBundleAnalyzer],
  config
)
