import { Container, Grid } from '@mantine/core';
import React from 'react';

import ProductCard from '../card/Card';

type Props = {
  data: any[];
};

const randomOptions = [];

const AsymmetricalGrid = ({ data }: Props) => {
  const ref = React.useRef(0);
  return (
    <Grid>
      {data.map((item) => {
        return (
          <Grid.Col key={item.id} xs={6} md={4} lg={3}>
            <ProductCard product={item} />
          </Grid.Col>
        );
      })}
    </Grid>
  );
};
export default AsymmetricalGrid;
