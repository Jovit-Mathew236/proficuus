/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Matches all hostnames
      },
    ],
  },
};

export default nextConfig;

export const rewrites = {
  async headers() {
    return [{ source: "/(.*)", destination: "/" }];
  },
};
