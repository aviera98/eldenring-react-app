interface FavoriteBadgeProps {
  count: number;
}

export const FavoriteBadge = ({ count }: FavoriteBadgeProps) => (
  <span className="inline-flex min-w-6 items-center justify-center rounded-full border border-amber-300/30 bg-amber-300/10 px-2 py-1 text-xs font-semibold text-amber-100">
    {count}
  </span>
);
