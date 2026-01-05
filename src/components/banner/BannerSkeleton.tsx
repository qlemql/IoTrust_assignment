export const BannerSkeleton = () => (
  <div className="w-full h-48 rounded-xl bg-gray-200 animate-pulse">
    <div className="absolute bottom-0 left-0 right-0 p-4">
      <div className="h-5 w-3/4 bg-gray-300 rounded mb-2" />
      <div className="h-4 w-1/2 bg-gray-300 rounded mb-3" />
      <div className="h-9 w-24 bg-gray-300 rounded-lg" />
    </div>
  </div>
);
