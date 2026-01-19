import withPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactStrictMode: true,
};

const pwaConfig = withPWA({
   dest: 'public',       // service worker output
    register: true,       // auto-register service worker
    skipWaiting: true,    // immediately activate new SW
  disable: process.env.NODE_ENV === 'development',
});

export default pwaConfig(nextConfig);