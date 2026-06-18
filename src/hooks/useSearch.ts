import { useApolloClient, useQuery } from '@apollo/client';
import { useCallback, useDeferredValue, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { DEFAULT_PAGE_SIZE } from '@/constants/app';
import { isCategoryKey, type SearchScope } from '@/constants/categories';
import { CATEGORY_LIST_QUERIES } from '@/graphql/queries/category.queries';
import { GLOBAL_SEARCH_QUERY } from '@/graphql/queries/search.queries';
import { useDebounce } from '@/hooks/useDebounce';
import { normalizeEntityList, normalizeGlobalSearch } from '@/services/explorer.service';
import {
  fetchSearchResultsAcrossCategories,
  fetchSearchResultsByCategory,
} from '@/services/searchFallback.service';
import type { ExplorerItem, SearchFormValues } from '@/types/domain';
import type { CategoryListDataMap, GlobalSearchData } from '@/types/graphql';

const resolveScope = (value: string | null): SearchScope => {
  if (value === 'all') {
    return 'all';
  }

  return value && isCategoryKey(value) ? value : 'all';
};

export const useSearch = () => {
  const client = useApolloClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const scope = resolveScope(searchParams.get('category'));
  const query = searchParams.get('q') ?? '';
  const page = Math.max(1, Number(searchParams.get('page') ?? '1') || 1);
  const deferredQuery = useDeferredValue(query.trim());
  const debouncedQuery = useDebounce(deferredQuery, 250);
  const [fallbackItems, setFallbackItems] = useState<ExplorerItem[]>([]);
  const [fallbackError, setFallbackError] = useState<string | null>(null);
  const [fallbackLoading, setFallbackLoading] = useState(false);
  const [retrySeed, setRetrySeed] = useState(0);
  const isClientFilteredSearch = debouncedQuery.length > 0;

  const queryDocument = scope === 'all' ? GLOBAL_SEARCH_QUERY : CATEGORY_LIST_QUERIES[scope];

  const queryResult = useQuery(queryDocument, {
    // When the user types a term we switch to the client-side fallback because
    // the API text filters are not reliable for all categories.
    skip: isClientFilteredSearch,
    variables: {
      limit: DEFAULT_PAGE_SIZE,
      page,
      search: debouncedQuery || undefined,
    },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    if (!isClientFilteredSearch) {
      return;
    }

    let cancelled = false;

    const run = async () => {
      setFallbackLoading(true);
      setFallbackError(null);

      try {
        const items =
          scope === 'all'
            ? await fetchSearchResultsAcrossCategories(client, debouncedQuery)
            : await fetchSearchResultsByCategory(client, scope, debouncedQuery);

        if (!cancelled) {
          setFallbackItems(items);
        }
      } catch (error) {
        if (!cancelled) {
          setFallbackError(error instanceof Error ? error.message : 'Search failed.');
          setFallbackItems([]);
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
  }, [client, debouncedQuery, isClientFilteredSearch, retrySeed, scope]);

  const queryItems = useMemo(() => {
    if (scope === 'all') {
      return normalizeGlobalSearch(queryResult.data as GlobalSearchData | undefined);
    }

    return normalizeEntityList(
      scope,
      queryResult.data as CategoryListDataMap[typeof scope] | undefined,
    );
  }, [queryResult.data, scope]);

  const items = useMemo(() => {
    if (!isClientFilteredSearch) {
      return queryItems;
    }

    // The fallback can gather more than one backend page, so pagination is sliced locally.
    const start = (page - 1) * DEFAULT_PAGE_SIZE;

    return fallbackItems.slice(start, start + DEFAULT_PAGE_SIZE);
  }, [fallbackItems, isClientFilteredSearch, page, queryItems]);

  const updateSearch = (values: SearchFormValues) => {
    setSearchParams(
      {
        category: values.category,
        page: '1',
        ...(values.query ? { q: values.query.trim() } : {}),
      },
      { replace: false },
    );
  };

  const setPage = (nextPage: number) => {
    setSearchParams(
      {
        category: scope,
        page: String(nextPage),
        ...(query ? { q: query } : {}),
      },
      { replace: false },
    );
  };

  const retrySearch = useCallback(() => {
    if (isClientFilteredSearch) {
      // A seed bump re-triggers the fallback effect without mutating URL state.
      setRetrySeed((current) => current + 1);

      return;
    }

    void queryResult.refetch();
  }, [isClientFilteredSearch, queryResult]);

  return {
    ...queryResult,
    error: isClientFilteredSearch && fallbackError ? new Error(fallbackError) : queryResult.error,
    items,
    loading: isClientFilteredSearch ? fallbackLoading : queryResult.loading,
    page,
    query,
    retrySearch,
    scope,
    setPage,
    totalItems: isClientFilteredSearch ? fallbackItems.length : queryItems.length,
    updateSearch,
  };
};
