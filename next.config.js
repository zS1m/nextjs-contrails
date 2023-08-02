/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'chev.contrails.space',
        port: '12650',
        pathname: '/images/**'
      }
    ]
  }
}

module.exports = nextConfig
