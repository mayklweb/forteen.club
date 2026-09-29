/** @type {import('next').NextConfig} */
export default {
  reactStrictMode: true, images: {
    formats: ["image/avif", "image/webp"], remotePatterns: [
      {
        protocol: "https",
        hostname: "quechua-lookbook.com",
      },
    ],
  }
};
