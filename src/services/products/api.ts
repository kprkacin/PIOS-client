import { createApiCall } from '../api';
import { transformProduct } from './transformations';
import { Category, Product } from './types';

const limit = '?limit=100';

export const getAllProducts = async (): Promise<Product[]> => {
  const resp = await createApiCall({
    baseURL: 'https://dummyjson.com',
    url: `/products${limit}`,
    method: 'GET',
  })();

  return resp.data.products.map(transformProduct);
};

export const getProductsByCategory = async (category: Category): Promise<Product[]> => {
  const resp = await createApiCall({
    baseURL: 'https://dummyjson.com',
    url: `${category.toLowerCase()}/products${limit}`,
    method: 'GET',
  })();

  return resp.data.products.map(transformProduct);
};

export const getProductById = async (id: number): Promise<Product> => {
  const resp = await createApiCall({
    baseURL: 'https://dummyjson.com',
    url: `/products/${id}`,
    method: 'GET',
  })();

  return transformProduct(resp.data);
};

export const getProductsBySearch = async (search: string): Promise<Product[]> => {
  const resp = await createApiCall({
    baseURL: 'https://dummyjson.com',
    url: `/products/search?q=${search}${limit}`,
    method: 'GET',
  })();

  return resp.data.products.map(transformProduct);
};
