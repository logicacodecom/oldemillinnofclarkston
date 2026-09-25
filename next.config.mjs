/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/room-information", destination: "/rooms", permanent: true },
      { source: "/photo-gallery", destination: "/gallery", permanent: true },
      { source: "/nature", destination: "/lakefront-experience", permanent: true },
      { source: "/scenic-views", destination: "/lakefront-experience", permanent: true },
    ];
  },
};

export default nextConfig;
