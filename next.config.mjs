/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
const nextConfig = {
  output: "export",
  basePath: isProd ? "/proficuus" : "",
  publicRuntimeConfig: {
    basePath: isProd ? "/proficuus" : "",
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
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
