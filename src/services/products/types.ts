export enum Category {
  Smartphones = 'Smartphones',
  Laptops = 'Laptops',
  Fragrances = 'Fragrances',
  Skincare = 'Skincare',
  Groceries = 'Groceries',
  HomeDecoration = 'Home decoration',
  Furniture = 'Furniture',
  Tops = 'Tops',
  WomensDresses = 'Womens dresses',
  WomensShoes = 'Womens shoes',
  MensShirts = 'Mens shirts',
  MensShoes = 'Mens shoes',
  MensWatches = 'Mens watches',
  WomensWatches = 'Womens watches',
  WomensBags = 'Womens bags',
  WomensJewellery = 'Womens jewellery',
  Sunglasses = 'Sunglasses',
  Automotive = 'Automotive',
  Motorcycle = 'Motorcycle',
  Lighting = 'Lighting',
}

/*
  id: 1;
  title: 'iPhone 9';
  description: 'An apple mobile which is nothing like apple';
  price: 549;
  discountPercentage: 12.96;
  rating: 4.69;
  stock: 94;
  brand: 'Apple';
  category: 'smartphones';
  thumbnail: '...';
  images: ['...', '...', '...'];
*/

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: Category;
  thumbnail: string;
  images: string[];
}

export interface CartProduct {
  product: Product;
  quantity: number;
}
