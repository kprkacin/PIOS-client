import { createApiCall } from '../api';
import {
  getAllProducts as getAllProductsFB,
  getProductById as getProductByIdFB,
  getProductsByCategory as getProductsByCategoryFB,
  getAllWishlistItems,
  addProductToWishlist as addProductToWishlistFB,
  removeProductFromWishlist as removeProductFromWishlistFB,
} from '../firebase.js';
import { transformProduct } from './transformations';
import { Category, Product } from './types';

const limit = '?limit=100';

export const getAllProducts = async (): Promise<Product[]> => {
  const resp = await getAllProductsFB();
  console.log(resp, 'test');

  return resp.map(transformProduct);
};

export const getProductsByCategory = async (category: Category): Promise<Product[]> => {
  console.log(category, 'test2');
  const resp = await getProductsByCategoryFB(category.toLowerCase());
  console.log(resp, 'response');

  return resp.map(transformProduct);
};

export const getProductById = async (id: string): Promise<Product> => {
  const resp = getProductByIdFB(id);

  return transformProduct(resp);
};

export const getProductsBySearch = async (search: string): Promise<Product[]> => {
  const resp = await createApiCall({
    baseURL: 'https://dummyjson.com',
    url: `/products/search?q=${search}${limit}`,
    method: 'GET',
  })();

  return resp.data.products.map(transformProduct);
};

export const getWishlistProducts = async (): Promise<Product[]> => {
  const resp = await getAllWishlistItems();
  console.log(resp, 'wishlist products');
  return resp.map(transformProduct);
};

export const addProductToWishlist = async (productId: number): Promise<void> => {
  return await addProductToWishlistFB(productId);
};
export const removeProductFromWishlist = async (productId: number): Promise<void> => {
  return await removeProductFromWishlistFB(productId);
};
