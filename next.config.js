/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'donspremier.com.au',
      },
      {
        protocol: 'https',
        hostname: 'www.donspremier.com.au',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'c98d1863e2.sdkmedia.net',
      },
    ],
  },
};

module.exports = nextConfig;

