import type { NextConfig } from 'next';

const apiOrigin = process.env.RUDI_API_URL ?? 'https://rudi-production.up.railway.app';

const nextConfig: NextConfig = {
  async rewrites() {
    return [{ source: '/api/:path*', destination: `${apiOrigin}/:path*` }];
  },
};

export default nextConfig;
