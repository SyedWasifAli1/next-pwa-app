// import withPWA from 'next-pwa';

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   /* config options here */
//    swcMinify: true,
//   reactStrictMode: true,
//   turbopack: false,
// };

// const pwaConfig = withPWA({
//    dest: 'public',       // service worker output
//     register: true,       // auto-register service worker
//     skipWaiting: true,    // immediately activate new SW
//   // disable: process.env.NODE_ENV === 'development',
// });

// export default pwaConfig(nextConfig);


import withPWA from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  // ✅ Next.js 16 default Turbopack ON hota hai
  // next-pwa webpack use karta hai, isliye Turbopack OFF
  experimental: {
    turbo: false,
  },
};

const pwaConfig = withPWA({
  dest: "public",

  register: true,
  skipWaiting: true,

  // ❌ development mai disable MAT karo
  // warna offline testing kaam nahi karegi
  disable: false,

  // ✅ Important for App Router
  buildExcludes: [/middleware-manifest\.json$/],
});

export default pwaConfig(nextConfig);




























// import withPWA from 'next-pwa';

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   swcMinify: true,
//   turbopack: false, // REQUIRED
// };

// const pwaConfig = withPWA({
//   dest: 'public',
//   register: true,
//   skipWaiting: true,

//   // 🔴 VERY IMPORTANT
//   runtimeCaching: [
//     {
//       // Cache pages (HTML)
//       urlPattern: ({ request }) => request.mode === 'navigate',
//       handler: 'NetworkFirst',
//       options: {
//         cacheName: 'pages-cache',
//       },
//     },
//     {
//       // Cache JS, CSS, images
//       urlPattern: ({ request }) =>
//         request.destination === 'script' ||
//         request.destination === 'style' ||
//         request.destination === 'image',
//       handler: 'CacheFirst',
//       options: {
//         cacheName: 'assets-cache',
//         expiration: {
//           maxEntries: 200,
//         },
//       },
//     },
//   ],

//   // 🔴 Offline fallback
//   fallbacks: {
//     document: '/offline.html',
//   },

//   disable: process.env.NODE_ENV === 'development',
// });

// export default pwaConfig(nextConfig);
