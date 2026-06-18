import { Link } from 'react-router-dom';

import { Breadcrumb } from '@/components/Breadcrumb';
import { EmptyState } from '@/components/EmptyState';
import { ErrorMessage } from '@/components/ErrorMessage';
import { ItemCard } from '@/components/ItemCard';
import { Pagination } from '@/components/Pagination';
import { SearchBar } from '@/components/SearchBar';
import { DEFAULT_PAGE_SIZE } from '@/constants/app';
import { APP_ROUTES } from '@/constants/navigation';
import { useSearch } from '@/hooks/useSearch';

const SearchPage = () => {
  const {
    error,
    items,
    loading,
    page,
    query,
    retrySearch,
    scope,
    setPage,
    totalItems,
    updateSearch,
  } = useSearch();

  if (loading && items.length === 0) {
    return (
      <div className="surface-panel rounded-[2rem] px-6 py-12 text-center">Loading search...</div>
    );
  }

  if (error) {
    return (
      <ErrorMessage
        message={error.message}
        onRetry={() => {
          retrySearch();
        }}
      />
    );
  }

  return (
    <div className="space-y-8">
      <Breadcrumb items={[{ label: 'Home', to: APP_ROUTES.home }, { label: 'Search' }]} />

      <section className="surface-panel rounded-[2.5rem] px-6 py-8 md:px-8">
        <p className="text-xs uppercase tracking-[0.35em] text-amber-100/70">Global search</p>
        <h1 className="mt-3 font-display text-5xl text-amber-50">Search the archive</h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-stone-300">
          Search across every supported entity or narrow the scope to a single category without
          moving to another screen.
        </p>
        <SearchBar
          className="mt-8"
          defaultValues={{ category: scope, query }}
          onSearch={updateSearch}
          submitLabel="Refresh results"
        />
      </section>

      {items.length === 0 ? (
        <EmptyState
          title="No discoveries yet"
          description="Try another term or browse one of the archive categories directly."
          action={
            <Link
              to={APP_ROUTES.home}
              className="rounded-full border border-amber-200/30 px-4 py-2 text-sm font-semibold text-amber-50"
            >
              Back to home
            </Link>
          }
        />
      ) : (
        <>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-amber-100/70">Results</p>
              <h2 className="mt-2 font-display text-3xl text-amber-50">
                {query ? `Matches for "${query}"` : 'Curated archive snapshot'}
              </h2>
            </div>
            <p className="text-sm text-stone-300">{totalItems} entries matched</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {items.map((item) => (
              <ItemCard key={`${item.category}-${item.id}`} item={item} />
            ))}
          </div>

          <Pagination
            page={page}
            isLoading={loading}
            canGoNext={page * DEFAULT_PAGE_SIZE < totalItems}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
};

export default SearchPage;
