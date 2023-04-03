import { Box, Container, Loader, TextInput, Title } from '@mantine/core';
import { useEffect, useMemo, useState } from 'react';

import { ProductCard } from '../../components/card/Card';
import AsymmetricalGrid from '../../components/grids/AsymmetricalGrid';
import { getAllProducts, getProductsByCategory } from '../../services/products/api';
import { Category, Product } from '../../services/products/types';
import { IconSearch } from '@tabler/icons-react';
import { keys } from '@mantine/utils';
import { useDebouncedValue } from '@mantine/hooks';

type Props = {
  category?: any;
};

const ProductsPage = ({ category }: Props) => {
  const [data, setData] = useState<Product[]>([]);
  const [search, setSearch] = useState<string>('');
  const [debouncedSearch] = useDebouncedValue(search, 200);

  const filteredData = useMemo(() => {
    console.log('run');
    if (!debouncedSearch) return data;
    const query = debouncedSearch.toLowerCase().trim();
    return data.filter((item) =>
      keys(data[0]).some((key) => item[key].toString().toLowerCase().includes(query)),
    );
  }, [data, debouncedSearch]);

  useEffect(() => {
    (async () => {
      console.log('category products', category);
      if (category) {
        const resp = await getProductsByCategory(category);
        setData(resp);
        console.log(resp);
        return;
      }
      const resp = await getAllProducts();
      setData(resp);
    })();
  }, [category]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
  };

  return (
    <Container size={'xl'}>
      <TextInput
        placeholder="Search by name"
        mb="md"
        icon={<IconSearch size="0.9rem" stroke={1.5} />}
        value={search}
        onChange={handleSearchChange}
      />

      <AsymmetricalGrid data={filteredData || data} />
    </Container>
  );
};

export default ProductsPage;
