import type { CategoryKey, SearchScope } from '@/constants/categories';

export interface StatEntry {
  label: string;
  value: string;
}

export interface StatGroup {
  title: string;
  entries: StatEntry[];
}

export interface ExplorerItem {
  category: CategoryKey;
  categoryLabel: string;
  description: string;
  id: string;
  image: string | null;
  name: string;
  subtitle?: string;
  tags: string[];
}

export interface ExplorerDetail extends ExplorerItem {
  statGroups: StatGroup[];
}

export interface FavoriteItem {
  category: CategoryKey;
  categoryLabel: string;
  id: string;
  image: string | null;
  name: string;
}

export interface BreadcrumbItem {
  label: string;
  to?: string;
}

export interface SearchFormValues {
  category: SearchScope;
  query: string;
}
