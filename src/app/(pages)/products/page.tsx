import ProductListing from "@/components/products/productListing";
import { getAllProducts, getProductsBySubcategory } from "@/services/product.services";
import { getSpeficSubCategory } from "@/services/subCategories.services";
import { ProductI } from "@/types/product.type";
import type { SubcategoryI } from "@/types/subCategories.type";

export default async function Products({
  searchParams,
}: {
  searchParams: Promise<{ subcategory?: string | string[] }>;
}) {
  const { subcategory } = await searchParams;

  if (subcategory !== undefined) {
    if (typeof subcategory !== "string" || !subcategory.trim()) {
      throw new Error("Invalid subcategory filter");
    }
    const [products, response] = await Promise.all([
      getProductsBySubcategory(subcategory),
      getSpeficSubCategory(subcategory),
    ]);
    const selectedSubcategory: SubcategoryI | undefined = response.data;
    if (!selectedSubcategory) {
      throw new Error("Failed to fetch subcategory details");
    }
    return <ProductListing products={products} subcategoryName={selectedSubcategory.name} />;
  }

  const response = await getAllProducts();
  const products: ProductI[] = response.data;  

  return <ProductListing products={products} />;
}
