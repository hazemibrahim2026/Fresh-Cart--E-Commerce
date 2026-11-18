import Image from "next/image";
import Link from "next/link";
import { PackageOpen, Search, Tags } from "lucide-react";
import { searchCatalog } from "@/services/search.services";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[] }>;
}) {
  const { q } = await searchParams;
  const query = typeof q === "string" ? q.trim() : "";

  if (!query) {
    return (
      <main className="container mx-auto min-h-[55vh] px-4 py-16 text-center">
        <Search className="mx-auto size-12 text-gray-300" />
        <h1 className="mt-4 text-2xl font-bold text-gray-900">
          What are you looking for?
        </h1>
        <p className="mt-2 text-gray-500">
          Search for products, categories, or brands using the search bar.
        </p>
      </main>
    );
  }

  const { products, categories, brands } = await searchCatalog(query);
  const resultCount = products.length + categories.length + brands.length;

  return (
    <main className="container mx-auto min-h-[55vh] px-4 py-10">
      <div className="mb-10">
        <p className="text-sm font-medium text-green-600">Search results</p>
        <h1 className="mt-1 text-3xl font-bold text-gray-900">
          Results for &quot;{query}&quot;
        </h1>
        <p className="mt-2 text-gray-500">
          {resultCount} {resultCount === 1 ? "result" : "results"} found
        </p>
      </div>

      {resultCount === 0 ? (
        <div className="rounded-2xl border border-gray-100 bg-white py-16 text-center shadow-sm">
          <PackageOpen className="mx-auto size-12 text-gray-300" />
          <h2 className="mt-4 text-xl font-bold text-gray-900">
            No matches found
          </h2>
          <p className="mt-2 text-gray-500">
            Try a different product, category, or brand name.
          </p>
        </div>
      ) : (
        <div className="space-y-12">
          {products.length > 0 && (
            <section>
              <h2 className="mb-4 text-xl font-bold text-gray-900">
                Products ({products.length})
              </h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                {products.map((product) => (
                  <Link
                    key={product._id}
                    href={`/products/${product._id}`}
                    className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="relative aspect-square">
                      <Image
                        src={product.imageCover}
                        alt={product.title}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                        className="object-contain"
                      />
                    </div>
                    <h3 className="mt-3 line-clamp-2 font-medium text-gray-900">
                      {product.title}
                    </h3>
                    <p className="mt-2 font-bold text-green-600">
                      {product.priceAfterDiscount ?? product.price} EGP
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {categories.length > 0 && (
            <section>
              <h2 className="mb-4 text-xl font-bold text-gray-900">
                Categories ({categories.length})
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {categories.map((category) => (
                  <Link
                    key={category._id}
                    href={`/categories/${category._id}`}
                    className="flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition hover:border-green-200 hover:bg-green-50/50"
                  >
                    <Image
                      src={category.image}
                      alt=""
                      width={56}
                      height={56}
                      className="size-14 rounded-lg object-cover"
                    />
                    <span className="font-semibold text-gray-900">
                      {category.name}
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {brands.length > 0 && (
            <section>
              <h2 className="mb-4 text-xl font-bold text-gray-900">
                Brands ({brands.length})
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {brands.map((brand) => (
                  <Link
                    key={brand._id}
                    href={`/brands/${brand._id}`}
                    className="flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition hover:border-green-200 hover:bg-green-50/50"
                  >
                    <div className="flex size-14 items-center justify-center rounded-lg bg-gray-50">
                      <Image
                        src={brand.image}
                        alt={`${brand.name} logo`}
                        width={48}
                        height={48}
                        className="max-h-12 max-w-12 object-contain"
                      />
                    </div>
                    <span className="font-semibold text-gray-900">
                      {brand.name}
                    </span>
                    <Tags className="ml-auto size-4 text-gray-400" />
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </main>
  );
}
