interface PaginationProps {
  canGoNext: boolean;
  isLoading?: boolean;
  onPageChange: (page: number) => void;
  page: number;
}

export const Pagination = ({
  canGoNext,
  isLoading = false,
  onPageChange,
  page,
}: PaginationProps) => (
  <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/8 bg-black/20 px-4 py-3">
    <button
      type="button"
      onClick={() => {
        onPageChange(page - 1);
      }}
      disabled={page <= 1 || isLoading}
      className="rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-stone-200 transition enabled:hover:border-amber-200/30 enabled:hover:text-amber-100 disabled:cursor-not-allowed disabled:opacity-40"
    >
      Previous
    </button>
    <span className="text-sm uppercase tracking-[0.25em] text-amber-100/75">Page {page}</span>
    <button
      type="button"
      onClick={() => {
        onPageChange(page + 1);
      }}
      disabled={!canGoNext || isLoading}
      className="rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-stone-200 transition enabled:hover:border-amber-200/30 enabled:hover:text-amber-100 disabled:cursor-not-allowed disabled:opacity-40"
    >
      Next
    </button>
  </div>
);
