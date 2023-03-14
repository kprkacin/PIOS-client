import '../../App.css';

import { Box, Container, Loader, Title } from '@mantine/core';
import { useEffect, useState } from 'react';

import { ProductCard } from '../../components/card/Card';
import AsymmetricalGrid from '../../components/grids/AsymmetricalGrid';
import { getAllProducts } from '../../services/products/api';
import { Product } from '../../services/products/types';
type Props = {};

const Dashboard = (props: Props) => {
  const [data, setData] = useState<Product[]>([]);
  useEffect(() => {
    (async () => {
      const resp = await getAllProducts();
      setData(resp);
      console.log(resp);
    })();
  }, []);

  return (
    <Container size={'xl'}>
      <AsymmetricalGrid data={data} />
    </Container>
  );
};

export default Dashboard;
