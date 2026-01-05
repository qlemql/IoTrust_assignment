import { Skeleton } from '../common';

export const FavoritesSkeleton = () => (
  <div className="space-y-2">
    {[1, 2, 3].map((i) => (
      <div key={i} className="flex items-center gap-3 p-3 bg-white rounded-lg">
        <Skeleton width={48} height={48} rounded="lg" />
        <div className="flex-1">
          <Skeleton width="60%" height={16} className="mb-2" />
          <Skeleton width="80%" height={12} />
        </div>
        <Skeleton width={20} height={20} rounded="full" />
      </div>
    ))}
  </div>
);
