export const BlogSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Left Section - Latest Blogs */}
      <div className="col-span-1 md:col-span-2 space-y-8">
        <div className="animate-pulse space-y-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="relative overflow-hidden rounded-lg shadow-lg bg-white border border-gray-200"
            >
              <div className="h-48 bg-gray-200 w-full"></div>
              <div className="p-4">
                <div className="h-6 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Section - Popular Blogs */}
      <div className="col-span-1 mt-10 md:mt-0">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded mb-5 w-1/2"></div>
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="block p-3 rounded-lg shadow-lg bg-white border border-gray-200"
            >
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
