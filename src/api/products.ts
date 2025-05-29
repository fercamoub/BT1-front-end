import axios from "axios";
import type { Product, ProductForm, OverviewData } from "../types";

const api = "http://localhost:9090/api/products";

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await axios.get<Product[]>(api);
  return response.data;
};
export const createProduct = async (product: ProductForm): Promise<Product> => {
  const response = await axios.post<Product>(`${api}`, product);
  return response.data;
};
export const updateProduct = async (
  id: number,
  product: ProductForm
): Promise<Product> => {
  const response = await axios.put<Product>(`${api}/${id}`, product);
  return response.data;
};
export const deleteProduct = async (id: number): Promise<void> => {
  await axios.delete(`${api}/${id}`);
};
export const fetchProductById = async (id: number): Promise<Product> => {
  const response = await axios.get<Product>(`${api}/${id}`);
  return response.data;
};
export const fetchOverview = async (): Promise<OverviewData[]> => {
  const response = await axios.get<OverviewData[]>(`${api}/overview`);
  return response.data;
};
