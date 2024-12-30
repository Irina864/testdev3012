// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   async rewrites() {
//     return [
//       {
//         source: '/api/:path*',
//         destination: 'https://api.test.job.akatosphere.ru/:path*',
//         basePath: false,
//       },
//     ];
//   },
//   async headers() {
//     return [
//       {
//         source: '/api/:path*',
//         headers: [
//           { key: 'Access-Control-Allow-Credentials', value: 'true' },
//           { key: 'Access-Control-Allow-Origin', value: '*' },
//           { key: 'Access-Control-Allow-Methods', value: 'GET,POST,OPTIONS' },
//           { key: 'Access-Control-Allow-Headers', value: 'Content-Type' },
//         ],
//       },
//     ];
//   },
// };

// module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.test.job.akatosphere.ru/:path*',
        basePath: false,
      },
    ];
  },
};

export default nextConfig;
