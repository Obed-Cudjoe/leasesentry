/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Unsplash images are served from a CDN; allow them for remote <Image> usage.
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
  // Next 15+ caches server fetches lazily by default; keep it explicit for the static menu.
};

export default nextConfig;
