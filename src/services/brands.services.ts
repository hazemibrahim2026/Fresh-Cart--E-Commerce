const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export  async function getAllBrands() {
  const response = await fetch(`${baseURL}/api/v1/brands`);
  const data = await response.json();
  return data;
}

export  async function getSpeficBrand(brandId: string) {
  const response = await fetch(`${baseURL}/api/v1/brands/${brandId}`);
  const data = await response.json();
  return data;
}