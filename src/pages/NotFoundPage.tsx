import { Link } from 'react-router-dom';

import { EmptyState } from '@/components/EmptyState';
import { APP_ROUTES } from '@/constants/navigation';

const NotFoundPage = () => (
  <EmptyState
    title="Lost in the fog"
    description="The path you followed does not exist. Return to the archive and choose a new route."
    action={
      <Link
        to={APP_ROUTES.home}
        className="rounded-full border border-amber-200/30 px-4 py-2 text-sm font-semibold text-amber-50"
      >
        Return home
      </Link>
    }
  />
);

export default NotFoundPage;
