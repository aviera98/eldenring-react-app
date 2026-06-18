export const APP_NAME = import.meta.env.VITE_APP_NAME ?? 'Elden Ring Explorer';
export const GRAPHQL_API_URL = import.meta.env.VITE_GRAPHQL_API_URL;
export const DEFAULT_PAGE_SIZE = Number(import.meta.env.VITE_DEFAULT_PAGE_SIZE ?? '12');

const GITHUB_PAGES_BASE_PATH = '/eldenring-react-app';

// GitHub Pages serves the app under a repository subpath, but local development runs at `/`.
// This keeps routing working in both environments without switching router types.
export const ROUTER_BASENAME = window.location.pathname.startsWith(`${GITHUB_PAGES_BASE_PATH}/`)
  ? GITHUB_PAGES_BASE_PATH
  : '/';
