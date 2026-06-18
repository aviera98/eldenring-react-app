import type { ApolloClient } from '@apollo/client';

import { CATEGORY_KEYS, type CategoryKey } from '@/constants/categories';
import { CATEGORY_LIST_QUERIES } from '@/graphql/queries/category.queries';
import { normalizeEntityList } from '@/services/explorer.service';
import type { ExplorerItem } from '@/types/domain';
import type { CategoryListDataMap } from '@/types/graphql';

const SEARCH_BATCH_SIZE = 50;
const SEARCH_MAX_PAGES = 20;

const normalizeSearchText = (value: string) =>
  value
    .normalize('NFD')
    .replaceAll(/\p{Diacritic}/gu, '')
    .trim()
    .toLocaleLowerCase();

const matchesSearch = (item: ExplorerItem, term: string) => {
  const normalizedTerm = normalizeSearchText(term);

  if (!normalizedTerm) {
    return true;
  }

  const haystack = [item.name, item.description, item.subtitle, item.categoryLabel, ...item.tags]
    .filter(Boolean)
    .join(' ');

  return normalizeSearchText(haystack).includes(normalizedTerm);
};

const fetchCategoryPage = async (
  client: ApolloClient<object>,
  category: CategoryKey,
  page: number,
) => {
  const result = await client.query({
    query: CATEGORY_LIST_QUERIES[category],
    variables: {
      limit: SEARCH_BATCH_SIZE,
      page,
    },
    // The fallback intentionally bypasses the cache because we are reconstructing
    // a full-text search index client-side from paginated server data.
    fetchPolicy: 'network-only',
  });

  return normalizeEntityList(category, result.data as CategoryListDataMap[CategoryKey] | undefined);
};

export const fetchSearchResultsByCategory = async (
  client: ApolloClient<object>,
  category: CategoryKey,
  term: string,
) => {
  const collected: ExplorerItem[] = [];

  // The official API exposes `search`, but for several entities it does not reliably
  // match by name. This fallback still uses the official API, then filters locally.
  for (let page = 1; page <= SEARCH_MAX_PAGES; page += 1) {
    const pageItems = await fetchCategoryPage(client, category, page);

    if (pageItems.length === 0) {
      break;
    }

    collected.push(...pageItems);

    if (pageItems.length < SEARCH_BATCH_SIZE) {
      break;
    }
  }

  return collected.filter((item) => matchesSearch(item, term));
};

export const fetchSearchResultsAcrossCategories = async (
  client: ApolloClient<object>,
  term: string,
) => {
  const results = await Promise.all(
    CATEGORY_KEYS.map(async (category) => fetchSearchResultsByCategory(client, category, term)),
  );

  return results.flat();
};
