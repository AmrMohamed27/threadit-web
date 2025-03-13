import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["ui-avatars.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "flowbite.com",
        port: "",
        pathname: "/docs/images/examples/**",
        search: "",
      },
      {
        protocol: "https",
        hostname: "ui-avatars.com",
        port: "",
        pathname: "api/**",
      },
      {
        protocol: "https",
        hostname: "434vhvyuuh.ufs.sh",
        port: "",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
