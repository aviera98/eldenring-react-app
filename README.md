# Elden Ring Explorer

Aplicacion React 19 + TypeScript + Apollo Client que consume exclusivamente la API GraphQL oficial de Elden Ring:

`https://eldenring.fanapis.com/api/graphql`

## Stack

- React 19
- TypeScript estricto
- Vite
- Apollo Client
- GraphQL
- React Router DOM
- Tailwind CSS
- React Hook Form + Zod
- Vitest + React Testing Library
- ESLint + Prettier
- Husky + lint-staged

## Estructura

```text
src/
  api/          Apollo Client y configuracion de red
  assets/       SVGs y recursos visuales locales
  components/   Componentes reutilizables y presentacionales
  constants/    Configuracion del dominio, rutas y variables base
  context/      Estado global con React Context
  graphql/      Fragments y queries organizadas por entidad
  hooks/        Custom hooks reutilizables
  layouts/      Shell principal de la aplicacion
  pages/        Vistas lazy loaded por ruta
  routes/       Definicion del enrutado
  services/     Normalizacion y logica de dominio
  store/        Punto de extension para stores futuros
  tests/        Setup, helpers y tests de ejemplo
  types/        Tipos de GraphQL y modelos de UI
  utils/        Helpers puros
```

## Scripts

```bash
npm install
npm run dev
npm run build
npm run preview
npm run predeploy
npm run deploy
npm run lint
npm run test
npm run test:coverage
npm run format
```

## Variables de entorno

Crear `.env` a partir de `.env.example`.

```env
VITE_GRAPHQL_API_URL=https://eldenring.fanapis.com/api/graphql
VITE_APP_NAME=Elden Ring Explorer
VITE_DEFAULT_PAGE_SIZE=12
```

## Calidad

- `pre-commit` ejecuta `lint-staged`, `eslint` y `vitest`
- Si falla lint o tests, el commit queda bloqueado
- La arquitectura ya queda preparada para autenticacion, backend propio, filtros avanzados, i18n, PWA e infinite scroll

## Despliegue en GitHub Pages

Repositorio objetivo:

- Owner: `aviera98`
- Repo: `eldenring-react-app`
- URL final: `https://aviera98.github.io/eldenring-react-app/`

Configuracion aplicada:

- `vite.config.ts` usa `base: '/eldenring-react-app/'`
- `BrowserRouter` detecta el subpath de GitHub Pages y aplica el `basename` correcto
- el build genera tambien `dist/404.html` para soportar refresh y rutas directas en una SPA
- se agrego `gh-pages` para despliegue manual
- se agrego GitHub Actions para despliegue automatico en cada push a `main`

### Opcion recomendada: GitHub Actions

Es preferible a `gh-pages` porque:

- no depende de una maquina local para publicar
- deja el deploy versionado y auditable
- se ejecuta automaticamente al hacer push a `main`
- usa el flujo moderno nativo de GitHub Pages

Pasos en GitHub:

1. Ir a `Settings > Pages`
2. En `Source`, elegir `GitHub Actions`
3. Hacer push a `main`

El workflow esta en `.github/workflows/deploy.yml`.

### Despliegue manual con gh-pages

```bash
npm run deploy
```

Ese comando ejecuta:

1. `predeploy` -> `npm run build`
2. `deploy` -> publica `dist` en GitHub Pages usando `gh-pages`

### Verificacion local antes de desplegar

```bash
npm run build
npm run preview
```
