interface ErrorMessageProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorMessage = ({
  message = 'A disturbance interrupted the connection to the Lands Between.',
  onRetry,
}: ErrorMessageProps) => (
  <div className="surface-panel rounded-3xl border border-rose-300/20 px-6 py-8 text-center">
    <h2 className="font-display text-2xl text-rose-100">Something broke</h2>
    <p className="mt-3 text-sm text-stone-300">{message}</p>
    {onRetry ? (
      <button
        type="button"
        onClick={onRetry}
        className="mt-5 rounded-full border border-amber-300/30 px-4 py-2 text-sm font-semibold text-amber-100 transition hover:bg-amber-300/10"
      >
        Retry
      </button>
    ) : null}
  </div>
);
