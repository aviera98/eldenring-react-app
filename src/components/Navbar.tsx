import { NavLink } from 'react-router-dom';

import brandRune from '@/assets/brand-rune.svg';
import { FavoriteBadge } from '@/components/FavoriteBadge';
import { APP_NAME } from '@/constants/app';
import { APP_ROUTES } from '@/constants/navigation';
import { useFavorites } from '@/hooks/useFavorites';
import { cn } from '@/utils/cn';

const navLinkClassName = ({ isActive }: { isActive: boolean }) =>
  cn(
    'rounded-full px-4 py-2 text-sm font-semibold transition',
    isActive ? 'bg-amber-200/12 text-amber-50' : 'text-stone-300 hover:text-amber-100',
  );

export const Navbar = () => {
  const { favorites } = useFavorites();

  return (
    <header className="sticky top-0 z-20 border-b border-white/6 bg-black/20 backdrop-blur-xl">
      <div className="page-shell flex flex-col gap-4 py-4 md:flex-row md:items-center md:justify-between">
        <NavLink to={APP_ROUTES.home} className="flex items-center gap-3">
          <img src={brandRune} alt="" className="h-12 w-12" />
          <div>
            <p className="font-display text-lg text-amber-50">{APP_NAME}</p>
            <p className="text-xs uppercase tracking-[0.35em] text-amber-100/70">GraphQL Archive</p>
          </div>
        </NavLink>

        <nav className="flex flex-wrap items-center gap-2">
          <NavLink to={APP_ROUTES.home} className={navLinkClassName}>
            Home
          </NavLink>
          <NavLink to={APP_ROUTES.search} className={navLinkClassName}>
            Search
          </NavLink>
          <NavLink to={APP_ROUTES.favorites} className={navLinkClassName}>
            <span className="inline-flex items-center gap-2">
              Favorites
              <FavoriteBadge count={favorites.length} />
            </span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
};
