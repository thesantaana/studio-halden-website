import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: "export",
    basePath: "/studio-halden-website",
    assetPrefix: "/studio-halden-website/",
    trailingSlash: true,
    images: {
        formats: ["image/avif", "image/webp"],
        unoptimized: true,
    },
};

export default nextConfig;

