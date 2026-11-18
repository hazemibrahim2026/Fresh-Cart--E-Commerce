import type { SubcategoryI } from "@/types/subCategories.type";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export  async function getAllSubCategories() {
  const response = await fetch(`${baseURL}/api/v1/subcategories`);
  const data = await response.json();
  return data;
}

export  async function getSpeficSubCategory(categoryId: string) {
  const response = await fetch(`${baseURL}/api/v1/subcategories/${categoryId}`);
  const data = await response.json();
  return data;
}

export async function getSubCategoriesByCategory(categoryId: string): Promise<SubcategoryI[]> {
  async function getPage(page: number) {
    const query = new URLSearchParams({ category: categoryId, page: String(page) });
    const response = await fetch(`${baseURL}/api/v1/subcategories?${query}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch subcategories: ${response.status}`);
    }
    return response.json() as Promise<{
      data: SubcategoryI[];
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