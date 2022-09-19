/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	swcMinify: true,
	experimental: { esmExternals: true },
	async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: 'https://digizone-backend.onrender.com/api/v1/:path*' // Proxy to Backend
      }
    ]
  }
};

module.exports = nextConfig
