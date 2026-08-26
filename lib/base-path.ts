export const BASE_PATH = "/studio-halden-website";

export function withBasePath(path: string) {
  if (!path.startsWith("/") || path.startsWith(BASE_PATH)) return path;
  return `${BASE_PATH}${path}`;
}
