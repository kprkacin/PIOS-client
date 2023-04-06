import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Card,
  Center,
  createStyles,
  getStylesRef,
  Grid,
  Group,
  Image,
  Rating,
  rem,
  Stack,
  Text,
} from '@mantine/core';
import {
  IconGasStation,
  IconGauge,
  IconHeart,
  IconManualGearbox,
  IconMinus,
  IconPlus,
  IconSettings,
  IconUsers,
} from '@tabler/icons-react';

import { useCartContext } from '../../services/products/context';
import { CartProduct, Product } from '../../services/products/types';

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    [`&:hover .${getStylesRef('wishlist')}`]: {
      visibility: 'visible',
      opacity: 1,
    },

    boxShadow:
      '0px 0px 0px 0.5px rgba(50, 50, 93, 0.1), 0px 2px 5px 0px rgba(50, 50, 93, 0.1), 0px 1px 1.5px 0px rgba(0, 0, 0, 0.07)',
  },

  imageSection: {
    padding: theme.spacing.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRight: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
  wishlist: {
    ref: getStylesRef('wishlist'),

    position: 'absolute',
    top: rem(20),
    right: rem(20),
    opacity: 0,
    // cursor: 'pointer',
    visibility: 'hidden',

    transition: 'opacity 1s linear',
  },

  label: {
    marginBottom: theme.spacing.xs,
    lineHeight: 1,
    fontWeight: 700,
    fontSize: theme.fontSizes.xs,
    letterSpacing: rem(-0.25),
    textTransform: 'uppercase',
  },

  section: {
    padding: theme.spacing.md,
    height: '100%',
    borderLeft: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  icon: {
    marginRight: rem(5),
    color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[5],
  },
}));

const mockdata = [
  { label: '4 passengers', icon: IconUsers },
  { label: '100 km/h in 4 seconds', icon: IconGauge },
  { label: 'Automatic gearbox', icon: IconManualGearbox },
  { label: 'Electric', icon: IconGasStation },
];

type Props = {
  cartProduct: CartProduct;
};
const CartCard: React.FC<Props> = ({ cartProduct }) => {
  const { quantity, product } = cartProduct;
  const { classes } = useStyles();

  const { addProductToCart, removeProductFromCart } = useCartContext();

  return (
    <Card withBorder radius="md" mx={10} className={classes.card}>
      <Group position="apart">
        <Card.Section className={classes.imageSection} w="50%">
          <Image height={200} src={product.thumbnail} alt={product.title} />
        </Card.Section>
        <Stack w="50%" px="20" align="stretch">
          <Text fw={500}>{product.title}</Text>
          <Text fz="xs" c="dimmed">
            {product.description}
          </Text>
          <Group position="center">
            <Text fz="lg" fw={700} sx={{ lineHeight: 1 }}>
              ${product.price}
            </Text>
            <Badge variant="outline" color="red">
              {' '}
              {product.discountPercentage}% off
            </Badge>
          </Group>
          <Group position="center" spacing={0}>
            <ActionIcon
              size="2rem"
              variant="filled"
              radius="xs"
              color="gray"
              onClick={() => addProductToCart(product, 1)}
            >
              <IconPlus size="1.5rem" />
            </ActionIcon>
            <ActionIcon
              size="2rem"
              variant="filled"
              radius="xs"
              color="gray"
              onClick={() => {}}
              disabled
              style={{
                color: 'black',
              }}
            >
              {quantity}
            </ActionIcon>

            <ActionIcon
              size="2rem"
              variant="filled"
              radius="xs"
              color="gray"
              onClick={() => removeProductFromCart(product, 1)}
            >
              <IconMinus size="1.5rem" />
            </ActionIcon>
          </Group>
        </Stack>
      </Group>
    </Card>
  );
};

export default CartCard;
