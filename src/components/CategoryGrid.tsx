import { memo } from 'react';
import { Link } from 'react-router-dom';

import { CATEGORIES } from '@/constants/categories';

export const CategoryGrid = memo(() => (
  <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
    {CATEGORIES.map((category) => (
      <Link
        key={category.key}
        to={category.route}
        className={`ornate-border overflow-hidden rounded-[2rem] border border-white/8 bg-gradient-to-br ${category.heroTone} p-5 transition hover:-translate-y-1 hover:border-amber-200/30`}
      >
        <div className="flex items-center justify-between text-xs uppercase tracking-[0.35em] text-amber-100/80">
          <span>{category.icon}</span>
          <span>{category.label}</span>
        </div>
        <h3 className="mt-12 font-display text-3xl text-amber-50">{category.label}</h3>
        <p className="mt-3 text-sm text-stone-200">{category.description}</p>
      </Link>
    ))}
  </div>
));

CategoryGrid.displayName = 'CategoryGrid';
