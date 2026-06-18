import { useQuery } from '@apollo/client';
import { useMemo } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';

import { Breadcrumb } from '@/components/Breadcrumb';
import { EmptyState } from '@/components/EmptyState';
import { ErrorMessage } from '@/components/ErrorMessage';
import { LikeButton } from '@/components/LikeButton';
import { Loading } from '@/components/Loading';
import { CATEGORY_CONFIG, isCategoryKey } from '@/constants/categories';
import { APP_ROUTES } from '@/constants/navigation';
import { CATEGORY_DETAIL_QUERIES, RESOLVE_DETAIL_QUERY } from '@/graphql/queries/detail.queries';
import { useFavorites } from '@/hooks/useFavorites';
import {
  normalizeEntityDetail,
  resolveEntityDetail,
  toFavoriteItem,
} from '@/services/explorer.service';
import type { CategoryDetailDataMap, ResolveDetailData } from '@/types/graphql';

const DetailPage = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const { isFavorite, toggleFavorite } = useFavorites();
  const categoryHintParam = searchParams.get('category');
  const categoryHint =
    categoryHintParam && isCategoryKey(categoryHintParam) ? categoryHintParam : null;

  // When the user comes from a known category we can hit the exact detail query.
  // Otherwise we probe every supported entity to resolve `/detail/:id` safely.
  const queryDocument = categoryHint ? CATEGORY_DETAIL_QUERIES[categoryHint] : RESOLVE_DETAIL_QUERY;

  const queryResult = useQuery(queryDocument, {
    skip: !id,
    variables: { id },
  });

  const detail = useMemo(() => {
    if (categoryHint) {
      return normalizeEntityDetail(
        categoryHint,
        queryResult.data as CategoryDetailDataMap[typeof categoryHint] | undefined,
      );
    }

    return resolveEntityDetail(queryResult.data as ResolveDetailData | undefined);
  }, [categoryHint, queryResult.data]);

  if (!id) {
    return (
      <EmptyState
        title="Invalid detail path"
        description="The requested entity does not have a valid identifier."
      />
    );
  }

  if (queryResult.loading && !detail) {
    return <Loading />;
  }

  if (queryResult.error) {
    return (
      <ErrorMessage
        message={queryResult.error.message}
        onRetry={() => {
          void queryResult.refetch();
        }}
      />
    );
  }

  if (!detail) {
    return (
      <EmptyState
        title="Entity not found"
        description="The archive could not resolve that entity. It may have been removed or the identifier is invalid."
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
  }

  const active = isFavorite(detail.id, detail.category);

  return (
    <div className="space-y-8">
      <Breadcrumb
        items={[
          { label: 'Home', to: APP_ROUTES.home },
          {
            label: CATEGORY_CONFIG[detail.category].label,
            to: CATEGORY_CONFIG[detail.category].route,
          },
          { label: detail.name },
        ]}
      />

      <section className="surface-panel rounded-[2.5rem] p-6 md:p-8">
        <div className="grid gap-8 lg:grid-cols-[360px_minmax(0,1fr)]">
          <div className="overflow-hidden rounded-[2rem] border border-white/8 bg-black/25">
            {detail.image ? (
              <img
                src={detail.image}
                alt={detail.name}
                className="h-full min-h-96 w-full object-cover"
              />
            ) : (
              <div className="flex min-h-96 items-center justify-center bg-gradient-to-br from-amber-200/10 to-black/40 text-sm uppercase tracking-[0.3em] text-amber-100/65">
                No image
              </div>
            )}
          </div>

          <div>
            <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-amber-100/70">
                  {detail.categoryLabel}
                </p>
                <h1 className="mt-3 font-display text-5xl text-amber-50">{detail.name}</h1>
                {detail.subtitle ? (
                  <p className="mt-3 text-lg text-stone-300">{detail.subtitle}</p>
                ) : null}
              </div>
              <LikeButton
                isActive={active}
                onToggle={() => {
                  toggleFavorite(toFavoriteItem(detail));
                }}
              />
            </div>

            <p className="mt-6 max-w-3xl text-base leading-8 text-stone-300">
              {detail.description}
            </p>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {detail.statGroups.map((group) => (
                <section
                  key={group.title}
                  className="rounded-[1.75rem] border border-white/8 bg-black/20 p-5"
                >
                  <h2 className="font-display text-2xl text-amber-50">{group.title}</h2>
                  <dl className="mt-4 space-y-3">
                    {group.entries.map((entry) => (
                      <div
                        key={`${group.title}-${entry.label}`}
                        className="flex items-start justify-between gap-3 border-b border-white/6 pb-3 text-sm"
                      >
                        <dt className="text-stone-400">{entry.label}</dt>
                        <dd className="max-w-[60%] text-right text-stone-100">{entry.value}</dd>
                      </div>
                    ))}
                  </dl>
                </section>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DetailPage;
