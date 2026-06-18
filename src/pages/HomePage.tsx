import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import brandRune from '@/assets/brand-rune.svg';
import { CategoryGrid } from '@/components/CategoryGrid';
import { SearchBar } from '@/components/SearchBar';
import { APP_ROUTES } from '@/constants/navigation';
import type { SearchFormValues } from '@/types/domain';

const heroPillars = [
  'Official GraphQL data source',
  'Favorites persisted in localStorage',
  'Scalable enterprise frontend architecture',
];

const HomePage = () => {
  const navigate = useNavigate();

  const handleSearch = useCallback(
    (values: SearchFormValues) => {
      const params = new URLSearchParams({
        category: values.category,
        page: '1',
      });

      if (values.query) {
        params.set('q', values.query);
      }

      void navigate(`${APP_ROUTES.search}?${params.toString()}`);
    },
    [navigate],
  );

  return (
    <div className="space-y-12">
      <section className="surface-panel overflow-hidden rounded-[2.5rem] border border-white/10 px-6 py-8 md:px-10 md:py-12">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-amber-100/70">
              Lands Between Atlas
            </p>
            <h1 className="mt-4 max-w-3xl font-display text-5xl leading-tight text-amber-50 md:text-6xl">
              Explore bosses, gear, relics, spirits, and arcane knowledge in one place.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-stone-300">
              Elden Ring Explorer consumes the official GraphQL API and translates its catalog into
              an extensible UI designed for future enterprise features.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {heroPillars.map((pillar) => (
                <span
                  key={pillar}
                  className="rounded-full border border-amber-200/15 px-4 py-2 text-sm text-amber-100/90"
                >
                  {pillar}
                </span>
              ))}
            </div>
          </div>

          <div className="relative mx-auto max-w-xs">
            <div className="absolute inset-0 rounded-full bg-amber-300/15 blur-3xl" />
            <img src={brandRune} alt="" className="relative mx-auto w-60" />
          </div>
        </div>

        <SearchBar className="mt-10" onSearch={handleSearch} submitLabel="Begin search" />
      </section>

      <section className="space-y-5">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-amber-100/70">Categories</p>
            <h2 className="mt-2 font-display text-4xl text-amber-50">Choose your path</h2>
          </div>
          <p className="max-w-lg text-right text-sm leading-7 text-stone-300">
            The structure is prepared for advanced filters, infinite scroll, authentication, and
            backend integrations without reworking the core domain model.
          </p>
        </div>
        <CategoryGrid />
      </section>
    </div>
  );
};

export default HomePage;
