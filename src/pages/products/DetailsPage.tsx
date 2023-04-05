import { Carousel } from '@mantine/carousel';
import {
  Badge,
  Box,
  Button,
  Container,
  createStyles,
  getStylesRef,
  Group,
  Image,
  Rating,
  rem,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { ProductCard } from '../../components/card/Card';
import AsymmetricalGrid from '../../components/grids/AsymmetricalGrid';
import { getAllProducts, getProductById } from '../../services/products/api';
import { Category, Product } from '../../services/products/types';
import { useCartContext } from '../../services/products/context';

const useStyles = createStyles((theme) => ({
  controls: {
    ref: getStylesRef('controls'),
    transition: 'opacity 150ms ease',
    opacity: 0,
  },
  indicator: {
    position: 'relative',
    left: rem(-400),
    width: rem(25),
    height: rem(4),
    transition: 'width 250ms ease',
    backgroundColor: theme.colors.blue,

    '&[data-active]': {
      width: rem(40),
    },
  },
  ctaWrapper: {
    borderRadius: rem(15),
    backgroundColor: theme.colors.blue[0],

    padding: rem(15),
  },
}));

const DetailsPage = () => {
  const [product, setProduct] = useState<Product>();
  const { id } = useParams();
  const { classes } = useStyles();

  const { addProductToCart } = useCartContext();

  useEffect(() => {
    (async () => {
      if (!id) return;
      const resp = await getAllProducts();
      setProduct(resp.find((p) => p.id.toString() === id));
    })();
  }, [id]);

  console.log(product);

  return (
    <Container size={'xl'}>
      <Group align="top" position="apart">
        <Carousel
          w={400}
          mx="auto"
          height={400}
          withControls={false}
          withIndicators
          orientation="vertical"
          classNames={classes}
        >
          {product?.images.map((image) => (
            <Carousel.Slide key={image}>
              <Image
                radius="lg"
                fit="cover"
                src={image}
                width={400}
                height={400}
                alt={product.title}
              />
            </Carousel.Slide>
          ))}
        </Carousel>
        <Stack maw="40%">
          <Title order={1}>{product?.title}</Title>
          <Group>
            <Badge variant="filled" w={100} color="blue">
              {product?.brand}
            </Badge>
            <Badge variant="dot" color="blue">
              {product?.category}
            </Badge>
          </Group>
          <Group>
            <Rating value={product?.rating} readOnly />
            <Text fz="sm" fw="700">
              {product?.rating} / 5
            </Text>
          </Group>
          <Group>
            <Badge variant="outline" color="red">
              {product?.discountPercentage}% off
            </Badge>
            <Text fz="xl" fw={700} sx={{ lineHeight: 1 }}>
              ${product?.price}
            </Text>
          </Group>
          <Stack>
            <Text fw={500}>Description</Text>
            <Text fz="sm" c="dimmed">
              {product?.description}
            </Text>
          </Stack>
          <Group position="apart" className={classes.ctaWrapper}>
            <Group>
              <Text fw={500} color="teal">
                In Stock {product?.stock}
              </Text>
            </Group>
            <Button
              onClick={() => addProductToCart(product!, 1)}
              radius="xl"
              variant="outline"
            >
              Add to cart
            </Button>
          </Group>
        </Stack>
      </Group>
    </Container>
  );
};

export default DetailsPage;
