const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export  async function getAllCategories() {
  const response = await fetch(`${baseURL}/api/v1/categories`);
  const data = await response.json();
  return data;
}

export  async function getSpeficCategory(categoryId: string) {
  const response = await fetch(`${baseURL}/api/v1/categories/${categoryId}`);
  const data = await response.json();
  return data;
}