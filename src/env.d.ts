/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_NAME?: string;
  readonly VITE_DEFAULT_PAGE_SIZE?: string;
  readonly VITE_GRAPHQL_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
