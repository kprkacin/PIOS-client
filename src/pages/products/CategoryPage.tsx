import React from 'react';
import { useLocation, useMatch, useParams } from 'react-router-dom';

import ProductsPage from './ProductsPage';
import { Category } from '../../services/products/types';

const CategoryPage = () => {
  const location = useLocation();
  const { category } = useParams();
  console.log('category', category);

  return <ProductsPage category={category} />;
};

export default CategoryPage;
