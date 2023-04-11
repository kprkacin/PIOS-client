import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { replacePropertyInArray } from '../helpers';
import { CartProduct, Product } from './types';
import {
  getWishlistProducts,
  addProductToWishlist,
  removeProductFromWishlist,
} from './api';
import { showNotification } from '@mantine/notifications';

export const CartContext = createContext<{
  products: CartProduct[];
  wishlistProducts: Product[];
  addProductToCart: (product: Product, quantity: number) => void;
  removeProductFromCart: (product: Product, quantity: number) => void;
  addToWishlist: (productId: number) => void;
  removeFromWishlist: (productId: number) => void;
}>({
  products: [],
  wishlistProducts: [],
  addProductToCart: () => {},
  removeProductFromCart: () => {},
  addToWishlist: () => {},
  removeFromWishlist: () => {},
});

export const CartProvider: React.FC = ({ children }) => {
  const [products, setProducts] = useState<CartProduct[]>([]);
  const [wishlistProducts, setWishlistProducts] = useState<Product[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const resp = await getWishlistProducts();
        setWishlistProducts(resp);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const addProductToCart = (product: Product, quantity: number) => {
    const existingProductIdx = products.findIndex((p) => p.product.id === product.id);
    if (existingProductIdx !== -1) {
      setProducts((old) =>
        replacePropertyInArray(
          old,
          existingProductIdx,
          old[existingProductIdx].quantity + quantity,
          'quantity',
        ),
      );
      showNotification({
        message: `Added to cart`,
        color: 'green',
      });
    } else {
      setProducts([...products, { product, quantity }]);
    }
  };
  const removeProductFromCart = (product: Product, quantity: number) => {
    const existingProductIdx = products.findIndex((p) => p.product.id === product.id);

    if (existingProductIdx !== -1) {
      if (products[existingProductIdx].quantity - quantity <= 0) {
        setProducts((old) => old.filter((p) => p.product.id !== product.id));
      } else {
        setProducts((old) =>
          replacePropertyInArray(
            old,
            existingProductIdx,
            old[existingProductIdx].quantity - quantity,
            'quantity',
          ),
        );
      }
    }
  };

  const addToWishlist = async (productId: number) => {
    try {
      await addProductToWishlist(productId);
      showNotification({
        message: `Product added to wishlist`,
        color: 'green',
      });
      const resp = await getWishlistProducts();
      console.log(resp);
      setWishlistProducts(resp);
    } catch (error) {
      showNotification({
        message: `Error`,
        color: 'red',
      });
      console.error(error);
    }
  };

  const removeFromWishlist = async (productId: number) => {
    try {
      await removeProductFromWishlist(productId);
      showNotification({
        message: `Product removed from wishlist`,
        color: 'green',
      });
      const resp = await getWishlistProducts();
      setWishlistProducts(resp);
    } catch (error) {
      showNotification({
        message: `Error`,
        color: 'red',
      });
      console.error(error);
    }
  };

  const value = useMemo(
    () => ({
      products,
      wishlistProducts,
      addProductToCart,
      removeProductFromCart,
      addToWishlist,
      removeFromWishlist,
    }),
    [products, wishlistProducts],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCartContext = () => useContext(CartContext);
