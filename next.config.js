/** @type {import('next').NextConfig} */
const nextConfig = {
  // experimental: {
  //   appDir: true,
  // },
  images: {
    domains: ['assets.tryhackme.com', 'app.hackthebox.com'],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // 👈 required for static export
  images: {
    unoptimized: true, // GitHub Pages doesn’t support Next.js Image Optimization
  },
  basePath: "/Portfolio", // 👈 use your repo name here
  assetPrefix: "/Portfolio/",
};

module.exports = nextConfig;

