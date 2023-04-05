import React from 'react';
import { useLocation, useMatch, useParams } from 'react-router-dom';

import { Category } from '../../services/products/types';
import ProductsPage from './ProductsPage';

const CategoryPage = () => {
  const location = useLocation();
  const { category } = useParams();
  console.log('category', category);

  return <ProductsPage category={category} />;
};

export default CategoryPage;
