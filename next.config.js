// const { withNextVideo } = require('next-video/process')

// // next.config.js
// module.exports = {
//   async rewrites() {
//     return [
//       {
//         source: "/api/:path*",
//         destination: "http://localhost:3000/:path*",
//       },
//     ];
//   },
// };

module.exports = {
  experimental: {
    appDir: true,
  },
  webpackDevMiddleware: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };
    return config;
  },
};
