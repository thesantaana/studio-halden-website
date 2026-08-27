export const BASE_PATH = process.env.NEXT_PUBLIC_SITE_BASE_PATH ?? "";
export const IS_GITHUB_PAGES = BASE_PATH === "/studio-halden-website";

export function withBasePath(path: string) {
  if (!path.startsWith("/") || path.startsWith(BASE_PATH)) return path;
  return `${BASE_PATH}${path}`;
}
