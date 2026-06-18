import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Loading } from '@/components/Loading';
import { AppLayout } from '@/layouts/AppLayout';

const HomePage = lazy(() => import('@/pages/HomePage'));
const SearchPage = lazy(() => import('@/pages/SearchPage'));
const CategoryPage = lazy(() => import('@/pages/CategoryPage'));
const DetailPage = lazy(() => import('@/pages/DetailPage'));
const FavoritesPage = lazy(() => import('@/pages/FavoritesPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

export const AppRouter = () => (
  // Route-level lazy loading keeps the initial bundle focused on the landing experience.
  <Suspense fallback={<Loading />}>
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </Suspense>
);
