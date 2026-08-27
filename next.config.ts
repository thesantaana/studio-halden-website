import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
    output: "export",
    basePath: isGitHubPages ? "/studio-halden-website" : "",
    assetPrefix: isGitHubPages ? "/studio-halden-website/" : "",
    trailingSlash: true,
    images: {
        unoptimized: true,
    },
};

export default nextConfig;

