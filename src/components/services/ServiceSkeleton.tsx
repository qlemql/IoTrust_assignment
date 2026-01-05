import { Skeleton } from '../common';

interface Props {
  count?: number;
}

export const ServiceSkeleton = ({ count = 5 }: Props) => (
  <div className="divide-y divide-gray-100">
    {Array.from({ length: count }).map((_, index) => (
      <div key={index} className="flex items-center gap-3 p-3">
        <Skeleton width={48} height={48} rounded="lg" />
        <div className="flex-1">
          <Skeleton width="50%" height={16} className="mb-2" />
          <Skeleton width="80%" height={12} />
        </div>
      </div>
    ))}
  </div>
);
