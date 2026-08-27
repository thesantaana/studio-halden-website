import type { NextConfig } from "next";

const siteBasePath = process.env.NEXT_PUBLIC_SITE_BASE_PATH ?? "";

const nextConfig: NextConfig = {
    output: "export",
    basePath: siteBasePath,
    assetPrefix: siteBasePath ? `${siteBasePath}/` : "",
    trailingSlash: true,
    images: {
        unoptimized: true,
    },
};

export default nextConfig;

