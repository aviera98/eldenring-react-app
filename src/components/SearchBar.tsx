import { zodResolver } from '@hookform/resolvers/zod';
import { memo, startTransition, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { CATEGORIES, type CategoryKey } from '@/constants/categories';
import type { SearchFormValues } from '@/types/domain';
import { cn } from '@/utils/cn';

const SEARCH_SCOPE_VALUES = [
  'all',
  'bosses',
  'weapons',
  'armor',
  'items',
  'talismans',
  'classes',
  'spirits',
  'sorceries',
] as const;

const searchSchema = z.object({
  category: z.enum(SEARCH_SCOPE_VALUES),
  query: z.string().trim().max(60, 'Search text must be 60 characters or less.'),
});

interface SearchBarProps {
  className?: string;
  defaultValues?: Partial<SearchFormValues>;
  lockedCategory?: CategoryKey;
  onSearch: (values: SearchFormValues) => void;
  showCategorySelect?: boolean;
  submitLabel?: string;
}

export const SearchBar = memo(
  ({
    className,
    defaultValues,
    lockedCategory,
    onSearch,
    showCategorySelect = true,
    submitLabel = 'Search',
  }: SearchBarProps) => {
    const form = useForm<SearchFormValues>({
      defaultValues: {
        category: lockedCategory ?? defaultValues?.category ?? 'all',
        query: defaultValues?.query ?? '',
      },
      resolver: zodResolver(searchSchema),
    });

    useEffect(() => {
      form.reset({
        category: lockedCategory ?? defaultValues?.category ?? 'all',
        query: defaultValues?.query ?? '',
      });
    }, [defaultValues?.category, defaultValues?.query, form, lockedCategory]);

    return (
      <form
        className={cn(
          'surface-panel grid gap-4 rounded-[2rem] p-4 md:grid-cols-[minmax(0,1fr)_auto_auto]',
          className,
        )}
        onSubmit={form.handleSubmit((values) => {
          startTransition(() => {
            onSearch({
              category: lockedCategory ?? values.category,
              query: values.query.trim(),
            });
          });
        })}
      >
        <label className="flex flex-col gap-2">
          <span className="text-xs uppercase tracking-[0.3em] text-amber-100/75">Search</span>
          <input
            {...form.register('query')}
            type="search"
            placeholder="Search the Lands Between..."
            className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-stone-100 outline-none transition focus:border-amber-200/40"
          />
          {form.formState.errors.query ? (
            <span className="text-xs text-rose-200">{form.formState.errors.query.message}</span>
          ) : null}
        </label>

        {showCategorySelect && !lockedCategory ? (
          <label className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-[0.3em] text-amber-100/75">Scope</span>
            <select
              {...form.register('category')}
              className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-stone-100 outline-none transition focus:border-amber-200/40"
            >
              <option value="all">All categories</option>
              {CATEGORIES.map((category) => (
                <option key={category.key} value={category.key}>
                  {category.label}
                </option>
              ))}
            </select>
          </label>
        ) : null}

        <button
          type="submit"
          className="self-end rounded-2xl border border-amber-200/35 bg-amber-200/10 px-6 py-3 font-semibold text-amber-50 transition hover:bg-amber-200/18"
        >
          {submitLabel}
        </button>
      </form>
    );
  },
);

SearchBar.displayName = 'SearchBar';
