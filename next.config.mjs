/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export",
  // distDir: ".next",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Matches all hostnames
      },
    ],
  },
  // async headers() {
  //   return [
  //     {
  //       source: "/:path*",
  //       headers: [
  //         {
  //           key: "Cache-Control",
  //           value: "no-store, max-age=0",
  //         },
  //         {
  //           key: "Vercel-CDN-Cache-Control",
  //           value: "no-store, max-age=0",
  //         },
  //       ],
  //     },
  //   ];
  // },
};

export default nextConfig;
