export const Loading = () => (
  <div className="surface-panel ornate-border rounded-3xl px-6 py-12 text-center text-stone-200">
    <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-amber-200/20 border-t-amber-200" />
    <p className="mt-4 text-sm uppercase tracking-[0.3em] text-amber-100/80">Summoning data...</p>
  </div>
);
