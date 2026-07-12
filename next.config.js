/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'coresg-normal.trae.ai',
      },
    ],
    unoptimized: true,
  },
}

module.exports = nextConfig
