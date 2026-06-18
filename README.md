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
