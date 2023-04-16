const baseUrl = "https://dummyjson.com/products";

export const getAllProducts = async () => {
  const result = await fetch(`${baseUrl}?limit=20`);
  return await result.json();
};

export const getProduct = async (id: string) => {
  const result = await fetch(`${baseUrl}/${id}`);
  return await result.json();
};
