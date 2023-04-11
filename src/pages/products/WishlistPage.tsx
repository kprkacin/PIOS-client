import {
  ActionIcon,
  Anchor,
  Badge,
  Button,
  Container,
  createStyles,
  Group,
  Progress,
  Rating,
  rem,
  ScrollArea,
  Table,
  Text,
  Title,
} from '@mantine/core';

import { Product } from '../../services/products/types';
import { useEffect, useState } from 'react';
import { getWishlistProducts } from '../../services/products/api';
import { useCartContext } from '../../services/products/context';
import { useNavigate } from 'react-router-dom';
import { IconTrash } from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
  progressBar: {
    '&:not(:first-of-type)': {
      borderLeft: `${rem(3)} solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white
      }`,
    },
  },
}));

export function WishlistPage() {
  const { classes, theme } = useStyles();
  const {
    wishlistProducts: products,
    removeFromWishlist,
    addProductToCart,
  } = useCartContext();
  const navigate = useNavigate();

  const handleTitleClicked = (product: Product) => {
    navigate(`/products/${product.id}`);
  };
  console.log(products, 'wishlistProducts');
  const rows = products.map((product) => {
    console.log(product);
    return (
      <tr key={product.title}>
        <td>
          <ActionIcon
            size="2rem"
            variant="transparent"
            radius="xs"
            color="gray"
            onClick={() => removeFromWishlist(product.id)}
          >
            <IconTrash size="1.5rem" />
          </ActionIcon>
        </td>
        <td>
          <Anchor onClick={() => handleTitleClicked(product)} component="button" fz="sm">
            {product.title}
          </Anchor>
        </td>
        <td>
          <Badge variant="dot">{product.brand}</Badge>
        </td>
        <td>{product.category}</td>
        <td>
          <Rating readOnly value={product.rating} />
        </td>
        <td>
          <Text fz="xl" fw={700} color="green" sx={{ lineHeight: 1 }}>
            ${product.price}
          </Text>
        </td>
        <td>
          <Button
            onClick={() => addProductToCart(product, 1)}
            radius="xl"
            variant="outline"
          >
            Add to cart
          </Button>
        </td>
      </tr>
    );
  });

  return (
    <Container size="xl">
      <Title fs="italic" fw="300" size="56" align="center" mb={40} order={1}>
        Your wishlist
      </Title>
      <ScrollArea>
        <Table sx={{ minWidth: 800 }} verticalSpacing="xs">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Brand</th>
              <th>Category</th>
              <th>Rating</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
    </Container>
  );
}
