import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS === "true";
const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const isUserOrOrgPages = repoName.toLowerCase().endsWith(".github.io");

const pagesBasePath =
  process.env.PAGES_BASE_PATH ??
  (isGithubActions && repoName && !isUserOrOrgPages ? `/${repoName}` : "");

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  basePath: pagesBasePath,
  assetPrefix: pagesBasePath,
};

export default nextConfig;
