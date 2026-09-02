import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  trailingSlash: true,
  async headers() {
    const downloadHeaders = (contentType: string) => [
      { key: 'Content-Disposition', value: 'attachment' },
      { key: 'Content-Type', value: contentType },
      { key: 'Cache-Control', value: 'public, max-age=3600' },
    ];
    const cacheHeaders = (value: string) => [
      { key: 'Cache-Control', value },
    ];

    return [
      {
        source: '/_next/static/:path*',
        headers: cacheHeaders('public, max-age=31536000, immutable'),
      },
      {
        source: '/screenshots/:path*',
        headers: cacheHeaders('public, max-age=604800, stale-while-revalidate=86400'),
      },
      {
        source: '/favicon.svg',
        headers: cacheHeaders('public, max-age=604800, stale-while-revalidate=86400'),
      },
      { source: '/windows/:path*', headers: downloadHeaders('application/zip') },
      { source: '/macos/:path*', headers: downloadHeaders('application/gzip') },
      { source: '/linux/:path*', headers: downloadHeaders('application/gzip') },
      { source: '/android/:path*', headers: downloadHeaders('application/vnd.android.package-archive') },
    ];
  },
};

export default nextConfig;
