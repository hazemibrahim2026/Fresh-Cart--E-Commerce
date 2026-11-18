import type { ProductI } from "@/types/product.type";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export  async function getAllProducts() {
  const response = await fetch(`${baseURL}/api/v1/products`);
  const data = await response.json();
  return data;
}

export async function getProductsByBrand(brandId: string): Promise<ProductI[]> {
  return getFilteredProducts("brand", brandId);
}

export async function getProductsBySubcategory(subcategoryId: string): Promise<ProductI[]> {
  return getFilteredProducts("subcategory", subcategoryId);
}

async function getFilteredProducts(filter: "brand" | "subcategory", id: string): Promise<ProductI[]> {
  async function getPage(page: number) {
    const query = new URLSearchParams({ [filter]: id, page: String(page) });
    const response = await fetch(`${baseURL}/api/v1/products?${query}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${filter} products: ${response.status}`);
    }
    return response.json() as Promise<{
      data: ProductI[];
      metadata: { numberOfPages: number };
    }>;
  }

  const firstPage = await getPage(1);
  const remainingPages = await Promise.all(
    Array.from(
      { length: Math.max(0, firstPage.metadata.numberOfPages - 1) },
      (_, index) => getPage(index + 2),
    ),
  );
  return [firstPage, ...remainingPages].flatMap((page) => page.data);
}

export  async function getProductDetails(productId : string){
    const response = await fetch(`${baseURL}/api/v1/products/${productId}`);
    const data = await response.json();
    return data;
}