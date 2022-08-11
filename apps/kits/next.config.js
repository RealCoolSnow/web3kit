/** @type {import('next').NextConfig} */
const compose = require('next-compose-plugins')
const { i18n } = require('./next-i18next.config')
const withBundleAnalyzer = require('@next/bundle-analyzer')({ enabled: process.env.ANALYZE == 'true' })
const { withSentryConfig } = require('@sentry/nextjs')

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore
  authToken: process.env.SENTRY_AUTH_TOKEN,
  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

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

module.exports = withSentryConfig(compose(
  [withBundleAnalyzer],
  config,
  sentryWebpackPluginOptions
))
