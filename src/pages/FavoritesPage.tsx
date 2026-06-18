import { Link } from 'react-router-dom';

import { Breadcrumb } from '@/components/Breadcrumb';
import { EmptyState } from '@/components/EmptyState';
import { ItemCard } from '@/components/ItemCard';
import { APP_ROUTES } from '@/constants/navigation';
import { useFavorites } from '@/hooks/useFavorites';
import type { ExplorerItem } from '@/types/domain';

const FavoritesPage = () => {
  const { favorites } = useFavorites();

  const items: ExplorerItem[] = favorites.map((favorite) => ({
    category: favorite.category,
    categoryLabel: favorite.categoryLabel,
    description:
      'Stored locally for quick access. Open detail to load the latest official API data.',
    id: favorite.id,
    image: favorite.image,
    name: favorite.name,
    subtitle: 'Favorite archive entry',
    tags: ['Persisted'],
  }));

  return (
    <div className="space-y-8">
      <Breadcrumb items={[{ label: 'Home', to: APP_ROUTES.home }, { label: 'Favorites' }]} />

      <section className="surface-panel rounded-[2.5rem] px-6 py-8 md:px-8">
        <p className="text-xs uppercase tracking-[0.35em] text-amber-100/70">Favorites</p>
        <h1 className="mt-3 font-display text-5xl text-amber-50">Saved discoveries</h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-stone-300">
          Favorites are persisted in localStorage and restored automatically after refresh.
        </p>
      </section>

      {items.length === 0 ? (
        <EmptyState
          title="No favorites saved"
          description="Add bosses, weapons, armor, or spells to your personal archive."
          action={
            <Link
              to={APP_ROUTES.home}
              className="rounded-full border border-amber-200/30 px-4 py-2 text-sm font-semibold text-amber-50"
            >
              Explore categories
            </Link>
          }
        />
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          {items.map((item) => (
            <ItemCard key={`${item.category}-${item.id}`} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
