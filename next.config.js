/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  webpack: (config, _options) => {
    config.module.rules.push({
      test: /\.(mp4)$/,
      use: {
        loader: require.resolve('url-loader'),
      },
    });
    return config;
  },
};
