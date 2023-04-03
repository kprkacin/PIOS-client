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
  IconSettings,
  IconUsers,
} from '@tabler/icons-react';

import { Product } from '../../services/products/types';
import { useCartContext } from '../../services/products/context';
import { memo } from 'react';

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    [`&:hover .${getStylesRef('wishlist')}`]: {
      visibility: 'visible',
      opacity: 1,
    },
  },

  imageSection: {
    padding: theme.spacing.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottom: `${rem(1)} solid ${
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
    borderTop: `${rem(1)} solid ${
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
  product: Product;
};
const ProductCard: React.FC<Props> = ({ product }) => {
  const { classes } = useStyles();
  const { addProductToCart } = useCartContext();
  const features = mockdata.map((feature) => (
    <Center key={feature.label}>
      <feature.icon size="1.05rem" className={classes.icon} stroke={1.5} />
      <Text size="xs">{feature.label}</Text>
    </Center>
  ));

  return (
    <Card withBorder radius="md" className={classes.card}>
      <Card.Section className={classes.imageSection}>
        <Image height={200} src={product.thumbnail} alt={product.title} />
        <ActionIcon
          className={classes.wishlist}
          size="lg"
          radius="xl"
          variant="filled"
          color="gray"
          onClick={() => {
            console.log('wishlist clicked');
          }}
        >
          <IconHeart size={25} />
        </ActionIcon>{' '}
      </Card.Section>

      <Group
        position="left"
        align="baseline"
        mt="sm"
        h={75}
        style={{
          overflow: 'hidden',
        }}
      >
        <div>
          <Text fw={500}>{product.title}</Text>
          <Text fz="xs" c="dimmed">
            {product.description}
          </Text>
        </div>
      </Group>

      <Card.Section className={classes.section} mt="md">
        <Text fz="sm" c="dimmed" className={classes.label}>
          About
        </Text>

        <Grid>
          <Grid.Col xs={12} md={6}>
            <Group noWrap position="left">
              <IconGauge size="1.05rem" className={classes.icon} stroke={1.5} />
              <Text truncate="end" size="xs">
                {' '}
                {product.brand}
              </Text>
            </Group>
          </Grid.Col>
          <Grid.Col xs={12} md={6}>
            <Group noWrap position="left">
              <IconGauge size="1.05rem" className={classes.icon} stroke={1.5} />
              <Text truncate="end" size="xs">
                {' '}
                {product.category}
              </Text>
            </Group>
          </Grid.Col>
          <Grid.Col xs={12} md={6}>
            <Group noWrap position="left">
              <Rating value={product.rating} />
            </Group>
          </Grid.Col>
          <Grid.Col xs={12} md={6}>
            <Group noWrap position="left">
              <IconGauge size="1.05rem" className={classes.icon} stroke={1.5} />
              <Text truncate="end" color="orange" size="xs" fw={500} fs="italic">
                {' '}
                {product.stock} IN STOCK
              </Text>
            </Group>
          </Grid.Col>
        </Grid>
      </Card.Section>

      <Card.Section className={classes.section}>
        <Group position="center" spacing={30}>
          <Group>
            <Badge variant="outline" color="red">
              {product.discountPercentage}% off
            </Badge>
            <Text fz="xl" fw={700} sx={{ lineHeight: 1 }}>
              ${product.price}
            </Text>
          </Group>

          <Button
            onClick={() => addProductToCart(product, 1)}
            radius="xl"
            variant="outline"
          >
            Add to cart
          </Button>
        </Group>
      </Card.Section>
    </Card>
  );
};

export default memo(ProductCard);
