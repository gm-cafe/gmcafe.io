/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'gmcafe.s3.us-east-2.amazonaws.com',
      'alpha.antistupid.com',
      'cdn.discordapp.com',
    ],
  },
  async redirects() {
    return [
      {
        source: '/checkin',
        destination: '/migrate',
        permanent: false,
      },
      {
        source: '/migration',
        destination: '/migrate',
        permanent: false,
      },
      {
        source: '/mint',
        destination: '/',
        permanent: false,
      },
      {
        source: '/banner',
        destination: '/banners',
        permanent: false,
      },
      {
        source: '/adopt',
        destination: '/',
        permanent: false,
      },
      {
        source: '/influence',
        destination: '/',
        permanent: false,
      },
      {
        source: '/reservation',
        destination: '/',
        permanent: false,
      },
    ];
  },
};
