import { Link } from 'react-router-dom';

import type { BreadcrumbItem } from '@/types/domain';

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb = ({ items }: BreadcrumbProps) => (
  <nav aria-label="Breadcrumb">
    <ol className="flex flex-wrap items-center gap-2 text-sm text-stone-300">
      {items.map((item, index) => (
        <li key={`${item.label}-${index}`} className="flex items-center gap-2">
          {item.to ? (
            <Link to={item.to} className="transition hover:text-amber-100">
              {item.label}
            </Link>
          ) : (
            <span className="text-amber-100">{item.label}</span>
          )}
          {index < items.length - 1 ? <span aria-hidden="true">/</span> : null}
        </li>
      ))}
    </ol>
  </nav>
);
