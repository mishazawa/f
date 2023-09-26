/** @type {import('next').NextConfig} */

const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `http://127.0.0.1:${process.env.SERVER_PORT}/:path*`, // Proxy to Backend
      },
    ];
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.fbx$/,
      use: "raw-loader",
    });
    return config;
  },
};

module.exports = nextConfig;
