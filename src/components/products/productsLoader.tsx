export default function ProductsLoader() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 mt-6">
      {[...Array(10)].map((_, i) => (
        <div key={i} className="flex">
          <div className="relative w-full flex flex-col bg-white border border-gray-200 rounded-lg overflow-hidden shadow-none animate-pulse">
            <div className="w-full h-60 bg-gray-200" />
            <div className="p-4 space-y-3">
              <div className="h-3 bg-gray-200 rounded w-1/2" />
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="flex gap-2 mt-4">
                <div className="h-8 bg-gray-200 rounded flex-1" />
                <div className="h-8 w-8 bg-gray-200 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
