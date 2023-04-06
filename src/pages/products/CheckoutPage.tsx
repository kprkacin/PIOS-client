import './stripe.css';

import { Carousel } from '@mantine/carousel';
import {
  Alert,
  Badge,
  Box,
  Button,
  Card,
  Container,
  createStyles,
  Divider,
  getStylesRef,
  Group,
  Image,
  Rating,
  rem,
  ScrollArea,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { ProductCard } from '../../components/card/Card';
import AsymmetricalGrid from '../../components/grids/AsymmetricalGrid';
import { getAllProducts, getProductById } from '../../services/products/api';
import { useCartContext } from '../../services/products/context';
import { Category, Product } from '../../services/products/types';
import CheckoutComponent from './CheckoutComponent';
import CartCard from '../../components/card/CartCard';
import { IconCurrencyDollar } from '@tabler/icons-react';

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
const stripePromise = loadStripe(
  'pk_test_51MtsgVAhGXmIzXLpJBel07rfgMVO7IP4TgKyDkTW5BWPDiw7Vurp56fJR1YkjcP83Tkd4XDRnzN8JXd08rZc3qXV00pYZtWE2s',
);

const CheckoutPage = () => {
  const [clientSecret, setClientSecret] = useState('');

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { products } = useCartContext();

  useEffect(() => {
    (async () => {
      const response = await fetch('https://api.stripe.com/v1/payment_intents', {
        body: 'amount=2000&currency=usd&automatic_payment_methods[enabled]=true',
        headers: {
          Authorization:
            'Bearer sk_test_51MtsgVAhGXmIzXLpR2kYcofbp4gQCg6VJmSlYCc5KltfW3DmiABiJ8IP50HeD8LXS6yiZx8kgvuZJlxIppic7Lup00l6pLjSec',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        method: 'POST',
      });
      const { client_secret } = await response.json();
      setClientSecret(client_secret);
    })();
  }, []);

  const options = {
    clientSecret,
  };

  return (
    <Container size={'xl'}>
      <Group position="apart" align="baseline">
        <Stack w="40%">
          <Title>Cart</Title>
          <ScrollArea h={`calc(70vh - ${rem(60)})`} mx="-md">
            <Stack align="center">
              {products.length === 0 && (
                <Text fw={300} fs="italic">
                  No products in cart
                </Text>
              )}
              {products.map((cartItem) => (
                <CartCard key={cartItem.product.id} cartProduct={cartItem} />
              ))}
            </Stack>
          </ScrollArea>
        </Stack>
        <Stack w="40%">
          <Title>Checkout</Title>
          {clientSecret && (
            <Elements stripe={stripePromise} options={options}>
              <CheckoutComponent />
            </Elements>
          )}
          <Alert icon={<IconCurrencyDollar size="1rem" />} title="Price" radius="md">
            <Text align="end" pr={25} fz={60} fw="650">
              $
              {products.reduce((acc, cartItem) => {
                return acc + cartItem.product.price * cartItem.quantity;
              }, 0)}
            </Text>
          </Alert>
        </Stack>
      </Group>
    </Container>
  );
};

export default CheckoutPage;
