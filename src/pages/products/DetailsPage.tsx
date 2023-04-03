import { Box, Container, Loader, Title } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { ProductCard } from '../../components/card/Card';
import AsymmetricalGrid from '../../components/grids/AsymmetricalGrid';
import { getAllProducts, getProductById } from '../../services/products/api';
import { Category, Product } from '../../services/products/types';

const DetailsPage = () => {
  const [product, setProduct] = useState<Product>();
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      if (!id) return;
      const resp = await getProductById(id);
      setProduct(resp);
    })();
  }, [id]);

  return <Container size={'xl'}>{product?.title}</Container>;
};

export default DetailsPage;
