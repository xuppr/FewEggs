const baseUrl = "https://dummyjson.com/products";

export const getAllProducts = async () => {
  const result = await fetch(`${baseUrl}?limit=20`);
  return await result.json();
};

export const getProduct = async (id: string) => {
  const result = await fetch(`${baseUrl}/${id}`);
  return await result.json();
};

export const getProductsByCategory = async (category: string) => {
  const data = await getAllProducts();
  return {
    products: data.products.filter(
      (product: { category: string }) => product.category === category
    ),
  };
};

export const getProductsByBrand = async (brand: string) => {
  const data = await getAllProducts();
  return {
    products: data.products.filter(
      (product: { brand: string }) => product.brand === brand
    ),
  };
};
