import { Product } from './types';

export const transformProduct = (response: any): Product => ({
  id: response.id,
  title: response.title,
  description: response.description,
  price: response.price,
  discountPercentage: response.discountPercentage,
  rating: response.rating,
  stock: response.stock,
  brand: response.brand,
  category: response.category,
  thumbnail: response.thumbnail,
  images: response.images,
});
