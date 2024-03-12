/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdcowvhqxdkmrcydurvo.supabase.co",
      },
    ],
  },
};

export default nextConfig;
