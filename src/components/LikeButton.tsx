interface LikeButtonProps {
  isActive: boolean;
  onToggle: () => void;
}

export const LikeButton = ({ isActive, onToggle }: LikeButtonProps) => (
  <button
    type="button"
    aria-label={isActive ? 'Remove from favorites' : 'Add to favorites'}
    aria-pressed={isActive}
    onClick={onToggle}
    className={`inline-flex items-center justify-center rounded-full border px-3 py-2 text-sm font-semibold transition ${
      isActive
        ? 'border-amber-200/45 bg-amber-200/15 text-amber-100'
        : 'border-white/10 bg-white/5 text-stone-200 hover:border-amber-200/30 hover:text-amber-100'
    }`}
  >
    <span aria-hidden="true">{isActive ? '★' : '☆'}</span>
    <span className="ml-2">{isActive ? 'Saved' : 'Save'}</span>
  </button>
);
