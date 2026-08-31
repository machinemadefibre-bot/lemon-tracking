import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async headers() {
    const downloadHeaders = (contentType: string) => [
      { key: 'Content-Disposition', value: 'attachment' },
      { key: 'Content-Type', value: contentType },
      { key: 'Cache-Control', value: 'public, max-age=3600' },
    ];

    return [
      { source: '/windows/:path*', headers: downloadHeaders('application/zip') },
      { source: '/macos/:path*', headers: downloadHeaders('application/gzip') },
      { source: '/linux/:path*', headers: downloadHeaders('application/gzip') },
      { source: '/android/:path*', headers: downloadHeaders('application/vnd.android.package-archive') },
    ];
  },
};

export default nextConfig;
