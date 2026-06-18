import type { ReactNode } from 'react';

interface EmptyStateProps {
  action?: ReactNode;
  description: string;
  title: string;
}

export const EmptyState = ({ action, description, title }: EmptyStateProps) => (
  <div className="surface-panel rounded-3xl px-6 py-12 text-center">
    <p className="text-xs uppercase tracking-[0.35em] text-amber-100/75">No results</p>
    <h2 className="mt-3 font-display text-3xl text-amber-50">{title}</h2>
    <p className="mx-auto mt-3 max-w-xl text-stone-300">{description}</p>
    {action ? <div className="mt-6">{action}</div> : null}
  </div>
);
