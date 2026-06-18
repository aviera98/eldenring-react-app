import { useApolloClient, useQuery } from '@apollo/client';
import { useEffect, useMemo, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';

import { Breadcrumb } from '@/components/Breadcrumb';
import { EmptyState } from '@/components/EmptyState';
import { ErrorMessage } from '@/components/ErrorMessage';
import { ItemCard } from '@/components/ItemCard';
import { Loading } from '@/components/Loading';
import { Pagination } from '@/components/Pagination';
import { SearchBar } from '@/components/SearchBar';
import { DEFAULT_PAGE_SIZE } from '@/constants/app';
import { CATEGORY_CONFIG, isCategoryKey } from '@/constants/categories';
import { APP_ROUTES } from '@/constants/navigation';
import { CATEGORY_LIST_QUERIES } from '@/graphql/queries/category.queries';
import { normalizeEntityList } from '@/services/explorer.service';
import { fetchSearchResultsByCategory } from '@/services/searchFallback.service';
import type { ExplorerItem, SearchFormValues } from '@/types/domain';
import type { CategoryListDataMap } from '@/types/graphql';

const CategoryPage = () => {
  const client = useApolloClient();
  const { category: categoryParam } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const category = categoryParam && isCategoryKey(categoryParam) ? categoryParam : null;
  const search = searchParams.get('q') ?? '';
  const page = Math.max(1, Number(searchParams.get('page') ?? '1') || 1);
  const [fallbackItems, setFallbackItems] = useState<ExplorerItem[]>([]);
  const [fallbackLoading, setFallbackLoading] = useState(false);
  const [fallbackError, setFallbackError] = useState<string | null>(null);
  const [retrySeed, setRetrySeed] = useState(0);
  const isClientFilteredSearch = search.trim().length > 0 && Boolean(category);

  const queryResult = useQuery(
    category ? CATEGORY_LIST_QUERIES[category] : CATEGORY_LIST_QUERIES.bosses,
    {
      // Category landing pages use direct GraphQL pagination until the user enters a term.
      skip: !category || isClientFilteredSearch,
      variables: {
        limit: DEFAULT_PAGE_SIZE,
        page,
        search: search || undefined,
      },
      notifyOnNetworkStatusChange: true,
    },
  );

  useEffect(() => {
    if (!category || !isClientFilteredSearch) {
      return;
    }

    let cancelled = false;

    const run = async () => {
      setFallbackLoading(true);
      setFallbackError(null);

      try {
        // This mirrors the global search fallback, but limits the crawl to one entity type.
        const items = await fetchSearchResultsByCategory(client, category, search);

        if (!cancelled) {
          setFallbackItems(items);
        }
      } catch (error) {
        if (!cancelled) {
          setFallbackItems([]);
          setFallbackError(error instanceof Error ? error.message : 'Search failed.');
        }
      } finally {
        if (!cancelled) {
          setFallbackLoading(false);
        }
      }
    };

    void run();

    return () => {
      cancelled = true;
    };
  }, [category, client, isClientFilteredSearch, retrySeed, search]);

  const queryItems = useMemo(
    () =>
      normalizeEntityList(
        category ?? 'bosses',
        queryResult.data as
          | CategoryListDataMap['armor']
          | CategoryListDataMap['bosses']
          | CategoryListDataMap['classes']
          | CategoryListDataMap['items']
          | CategoryListDataMap['sorceries']
          | CategoryListDataMap['spirits']
          | CategoryListDataMap['talismans']
          | CategoryListDataMap['weapons']
          | undefined,
      ),
    [category, queryResult.data],
  );

  const items = useMemo(() => {
    if (!isClientFilteredSearch) {
      return queryItems;
    }

    // The UI keeps the same pager component regardless of whether data came from Apollo
    // or from the fallback aggregation path.
    const start = (page - 1) * DEFAULT_PAGE_SIZE;

    return fallbackItems.slice(start, start + DEFAULT_PAGE_SIZE);
  }, [fallbackItems, isClientFilteredSearch, page, queryItems]);

  if (!category) {
    return (
      <EmptyState
        title="Unknown category"
        description="That archive does not exist in this version of the explorer."
        action={
          <Link
            to={APP_ROUTES.home}
            className="rounded-full border border-amber-200/30 px-4 py-2 text-sm font-semibold text-amber-50"
          >
            Return home
          </Link>
        }
      />
    );
  }

  const config = CATEGORY_CONFIG[category];

  const handleSearch = (values: SearchFormValues) => {
    setSearchParams({
      page: '1',
      ...(values.query ? { q: values.query } : {}),
    });
  };

  if (
    (isClientFilteredSearch && fallbackLoading) ||
    (!isClientFilteredSearch && queryResult.loading && !queryResult.data)
  ) {
    return <Loading />;
  }

  if ((isClientFilteredSearch && fallbackError) || (!isClientFilteredSearch && queryResult.error)) {
    const errorMessage = isClientFilteredSearch
      ? (fallbackError ?? 'Search failed.')
      : (queryResult.error?.message ?? 'Search failed.');

    return (
      <ErrorMessage
        message={errorMessage}
        onRetry={() => {
          if (isClientFilteredSearch) {
            // Re-run the fallback fetch without altering the current route params.
            setRetrySeed((current) => current + 1);
          } else {
            void queryResult.refetch();
          }
        }}
      />
    );
  }

  return (
    <div className="space-y-8">
      <Breadcrumb items={[{ label: 'Home', to: APP_ROUTES.home }, { label: config.label }]} />

      <section className="surface-panel rounded-[2.5rem] px-6 py-8 md:px-8">
        <p className="text-xs uppercase tracking-[0.35em] text-amber-100/70">Category</p>
        <h1 className="mt-3 font-display text-5xl text-amber-50">{config.label}</h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-stone-300">{config.description}</p>
        <SearchBar
          className="mt-8"
          defaultValues={{ category, query: search }}
          lockedCategory={category}
          onSearch={handleSearch}
          showCategorySelect={false}
          submitLabel={`Search ${config.label}`}
        />
      </section>

      {items.length === 0 ? (
        <EmptyState
          title="Nothing matched this search"
          description={`No ${config.label.toLowerCase()} were found for the current filters.`}
        />
      ) : (
        <>
          <div className="grid gap-6 lg:grid-cols-2">
            {items.map((item) => (
              <ItemCard key={`${item.category}-${item.id}`} item={item} />
            ))}
          </div>
          <Pagination
            page={page}
            isLoading={isClientFilteredSearch ? fallbackLoading : queryResult.loading}
            canGoNext={
              isClientFilteredSearch
                ? page * DEFAULT_PAGE_SIZE < fallbackItems.length
                : items.length === DEFAULT_PAGE_SIZE
            }
            onPageChange={(nextPage) => {
              setSearchParams({
                page: String(nextPage),
                ...(search ? { q: search } : {}),
              });
            }}
          />
        </>
      )}
    </div>
  );
};

export default CategoryPage;
