import type { CategoryKey } from '@/constants/categories';

export const buildDetailPath = (id: string, category: CategoryKey) =>
  `/detail/${encodeURIComponent(id)}?category=${encodeURIComponent(category)}`;
