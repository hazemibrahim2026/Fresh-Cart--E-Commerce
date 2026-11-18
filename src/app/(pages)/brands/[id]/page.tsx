import ProductListing from "@/components/products/productListing";
import { getSpeficBrand } from "@/services/brands.services";
import { getProductsByBrand } from "@/services/product.services";
import type { BrandI } from "@/types/brand.type";

export default async function BrandDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [brandResponse, products] = await Promise.all([
    getSpeficBrand(id),
    getProductsByBrand(id),
  ]);
  const brand: BrandI | undefined = brandResponse.data;

  if (!brand) {
    throw new Error("Failed to fetch brand details");
  }

  return <ProductListing products={products} brandName={brand.name} brandImage={brand.image} />;
}
