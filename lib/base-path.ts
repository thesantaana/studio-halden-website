export const IS_GITHUB_PAGES = process.env.GITHUB_ACTIONS === "true";
export const BASE_PATH = IS_GITHUB_PAGES ? "/studio-halden-website" : "";

export function withBasePath(path: string) {
  if (!path.startsWith("/") || path.startsWith(BASE_PATH)) return path;
  return `${BASE_PATH}${path}`;
}
