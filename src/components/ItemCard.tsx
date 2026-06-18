import { memo } from 'react';
import { Link } from 'react-router-dom';

import { LikeButton } from '@/components/LikeButton';
import { useFavorites } from '@/hooks/useFavorites';
import { toFavoriteItem } from '@/services/explorer.service';
import type { ExplorerItem } from '@/types/domain';
import { buildDetailPath } from '@/utils/route';

interface ItemCardProps {
  item: ExplorerItem;
}

export const ItemCard = memo(({ item }: ItemCardProps) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(item.id, item.category);

  return (
    <article className="surface-panel ornate-border overflow-hidden rounded-[2rem] p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-amber-100/75">
            {item.categoryLabel}
          </p>
          <h3 className="mt-2 font-display text-2xl text-amber-50">{item.name}</h3>
          {item.subtitle ? <p className="mt-1 text-sm text-stone-300">{item.subtitle}</p> : null}
        </div>
        <LikeButton
          isActive={active}
          onToggle={() => {
            toggleFavorite(toFavoriteItem(item));
          }}
        />
      </div>

      <div className="mt-5 overflow-hidden rounded-[1.5rem] border border-white/8 bg-black/20">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            className="h-56 w-full object-cover object-center"
            loading="lazy"
          />
        ) : (
          <div className="flex h-56 items-center justify-center bg-gradient-to-br from-amber-200/10 to-black/40 text-sm uppercase tracking-[0.3em] text-amber-100/65">
            No image
          </div>
        )}
      </div>

      <p className="mt-5 text-sm leading-7 text-stone-300">
        {item.description || 'No description available.'}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {item.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-amber-200/15 px-3 py-1 text-xs text-amber-100/85"
          >
            {tag}
          </span>
        ))}
      </div>

      <Link
        to={buildDetailPath(item.id, item.category)}
        className="mt-5 inline-flex rounded-full border border-amber-200/30 px-4 py-2 text-sm font-semibold text-amber-50 transition hover:bg-amber-200/10"
      >
        View detail
      </Link>
    </article>
  );
});

ItemCard.displayName = 'ItemCard';
