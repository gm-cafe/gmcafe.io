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
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  async rewrites() {
    return [
      {
        source: '/js/script.js',
        destination: 'https://plausible.io/js/plausible.js',
      },
      {
        source: '/api/event', // Or '/api/event/' if you have `trailingSlash: true` in this config
        destination: 'https://plausible.io/api/event',
      },
    ];
  },
};
