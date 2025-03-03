import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["ui-avatars.com"],
    remotePatterns: [
      {
        // https://flowbite.com/docs/images/examples/image-3@2x.jpg
        protocol: "https",
        hostname: "flowbite.com",
        port: "",
        pathname: "/docs/images/examples/**",
        search: "",
      },
      {
        // https://ui-avatars.com/api/?name=Music+u&background=7f96dc&color=ffffff
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
