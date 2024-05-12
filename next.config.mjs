/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ["chatbot.seeleng.dev", "localhost:3000"],
    },
  },
};

export default nextConfig;
