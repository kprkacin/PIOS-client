import './stripe.css';

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
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { ProductCard } from '../../components/card/Card';
import AsymmetricalGrid from '../../components/grids/AsymmetricalGrid';
import { getAllProducts, getProductById } from '../../services/products/api';
import { useCartContext } from '../../services/products/context';
import { Category, Product } from '../../services/products/types';

const CheckoutComponent = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { products } = useCartContext();

  return (
    <form id="payment-form" onSubmit={() => {}}>
      <PaymentElement id="payment-element" options={{ layout: 'tabs' }} />
      <button disabled={true} id="submit">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : 'Pay now'}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
};

export default CheckoutComponent;
