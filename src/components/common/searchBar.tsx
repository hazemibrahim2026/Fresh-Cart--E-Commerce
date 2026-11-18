import { Search } from "lucide-react";

export default function SearchBar({
  className,
  mobile = false,
}: {
  className?: string;
  mobile?: boolean;
}) {
  return (
    <form action="/search" method="get" role="search" className={className}>
      <div className="relative w-full">
        <input
          type="search"
          name="q"
          autoComplete="off"
          aria-label="Search products, categories, and brands"
          placeholder={mobile ? "Search products..." : "Search for products, brands and more..."}
          className={`w-full border border-gray-200 bg-gray-50/50 pr-12 pl-5 transition-all placeholder:text-gray-400 focus:border-green-600 focus:bg-white focus:ring-2 focus:ring-green-600/20 focus:outline-none ${
            mobile ? "h-14 rounded-2xl text-base" : "rounded-full py-3 text-sm"
          }`}
        />
        <button
          type="submit"
          aria-label="Search"
          className={`absolute top-1/2 right-2 flex -translate-y-1/2 items-center justify-center bg-green-600 text-white transition-colors hover:bg-green-700 ${
            mobile ? "size-10 rounded-xl" : "size-9 rounded-full"
          }`}
        >
          <Search className={mobile ? "size-5" : "size-3.5"} />
        </button>
      </div>
    </form>
  );
}
