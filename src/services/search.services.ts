import type { BrandI } from "@/types/brand.type";
import type { CategoryI } from "@/types/category.type";
import type { ProductI } from "@/types/product.type";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

interface CatalogResponse<T> {
  data: T[];
  metadata?: {
    numberOfPages: number;
  };
}

async function getAllItems<T>(path: string): Promise<T[]> {
  async function getPage(page: number) {
    const response = await fetch(`${baseURL}${path}?page=${page}`);
    if (!response.ok) {
      throw new Error(`Failed to search catalog: ${response.status}`);
    }
    return response.json() as Promise<CatalogResponse<T>>;
  }

  const firstPage = await getPage(1);
  const remainingPages = await Promise.all(
    Array.from(
      { length: Math.max(0, (firstPage.metadata?.numberOfPages ?? 1) - 1) },
      (_, index) => getPage(index + 2),
    ),
  );

  return [firstPage, ...remainingPages].flatMap((page) => page.data);
}

export async function searchCatalog(query: string) {
  const [products, categories, brands] = await Promise.all([
    getAllItems<ProductI>("/api/v1/products"),
    getAllItems<CategoryI>("/api/v1/categories"),
    getAllItems<BrandI>("/api/v1/brands"),
  ]);
  const normalizedQuery = query.toLocaleLowerCase();

  return {
    products: products.filter((product) =>
      [
        product.title,
        product.description,
        product.brand?.name,
        product.category?.name,
        product.subcategory?.map((item) => item.name).join(" "),
      ]
        .filter(Boolean)
        .some((value) => value.toLocaleLowerCase().includes(normalizedQuery)),
    ),
    categories: categories.filter((category) =>
      category.name.toLocaleLowerCase().includes(normalizedQuery),
    ),
    brands: brands.filter((brand) =>
      brand.name.toLocaleLowerCase().includes(normalizedQuery),
    ),
  };
}
