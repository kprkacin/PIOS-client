import { createContext, useContext, useState } from 'react';

import { replacePropertyInArray } from '../helpers';
import { CartProduct, Product } from './types';

export const CartContext = createContext<{
  products: CartProduct[];
  addProductToCart: (product: Product, quantity: number) => void;
  removeProductFromCart: (product: Product, quantity: number) => void;
}>({
  products: [],
  addProductToCart: () => {},
  removeProductFromCart: () => {},
});

export const CartProvider: React.FC = ({ children }) => {
  const [products, setProducts] = useState<CartProduct[]>([]);
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
  const value = { products, addProductToCart, removeProductFromCart };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCartContext = () => useContext(CartContext);
