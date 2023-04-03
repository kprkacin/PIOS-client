import {
  ActionIcon,
  Anchor,
  Badge,
  Box,
  Burger,
  Button,
  Center,
  Collapse,
  createStyles,
  Divider,
  Drawer,
  Group,
  Header,
  HoverCard,
  Image,
  NavLink,
  rem,
  ScrollArea,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  UnstyledButton,
} from '@mantine/core';
// import { MantineLogo } from '@mantine/ds';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import {
  IconBed,
  IconBook,
  IconBriefcase,
  IconBulb,
  IconCar,
  IconChartPie3,
  IconChevronDown,
  IconCode,
  IconCoin,
  IconDeviceLaptop,
  IconDeviceMobile,
  IconDeviceWatch,
  IconFingerprint,
  IconFlower,
  IconHandSanitizer,
  IconHome2,
  IconMan,
  IconMotorbike,
  IconNotification,
  IconShirt,
  IconShoe,
  IconShoppingBag,
  IconSunglasses,
  IconWoman,
  IconShoppingCart,
} from '@tabler/icons-react';
import { Link, useNavigate } from 'react-router-dom';

import { Category } from '../../services/products/types';
import { getAccessToken } from '../../services/helpers';
import { useCartContext } from '../../services/products/context';
import CartCard from '../card/CartCard';

const useStyles = createStyles((theme) => ({
  link: {
    display: 'flex',
    alignItems: 'center',
    // height: '100%',
    padding: theme.spacing.sm,
    width: 'unset',
    // paddingRight: theme.spacing.md,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,
    borderRadius: theme.radius.lg,

    [theme.fn.smallerThan('sm')]: {
      height: rem(42),
      display: 'flex',
      alignItems: 'center',
      width: '100%',
    },

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    }),
  },

  subLink: {
    width: '100%',
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    borderRadius: theme.radius.md,

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
    }),

    '&:active': theme.activeStyles,
  },

  dropdownFooter: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
    margin: `calc(${theme.spacing.md} * -1)`,
    marginTop: theme.spacing.sm,
    padding: `${theme.spacing.md} calc(${theme.spacing.md} * 2)`,
    paddingBottom: theme.spacing.xl,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },

  hiddenMobile: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },
  logo: {
    height: '100%',
    backgroundSize: 'cover',
    backgroundImage: 'url(./webcommerce.jpg)',
  },
}));

const mockdata = [
  {
    icon: IconDeviceMobile,
    title: 'Smartphones',
    category: Category.Smartphones,
    description: 'Stay connected with the latest smartphones and accessories',
  },
  {
    icon: IconDeviceLaptop,
    title: 'Laptops',
    category: Category.Laptops,
    description: 'Find high-performance laptops for work, gaming, and more',
  },
  {
    icon: IconFlower,
    title: 'Fragrances',
    category: Category.Fragrances,
    description: 'Discover a wide range of fragrances for men and women',
  },
  {
    icon: IconHandSanitizer,
    title: 'Skincare',
    category: Category.Skincare,
    description: 'Keep your skin healthy and glowing with top skincare products',
  },
  {
    icon: IconShoppingBag,
    title: 'Groceries',
    category: Category.Groceries,
    description: 'Shop daily essentials and groceries for your home',
  },
  {
    icon: IconHome2,
    title: 'Home Decoration',
    category: Category.HomeDecoration,
    description: 'Transform your living space with beautiful home decor items',
  },
  {
    icon: IconBed,
    title: 'Furniture',
    category: Category.Furniture,
    description: 'Furnish your home with comfortable and stylish furniture',
  },
  {
    icon: IconShirt,
    title: 'Tops',
    category: Category.Tops,
    description: 'Browse trendy tops for any occasion and style',
  },
  {
    icon: IconWoman,
    title: "Women's Dresses",
    category: Category.WomensDresses,
    description: 'Explore a wide range of dresses for women in various styles',
  },
  {
    icon: IconShoe,
    title: "Women's Shoes",
    category: Category.WomensShoes,
    description: "Step into the latest styles of women's shoes and footwear",
  },
  {
    icon: IconMan,
    title: "Men's Shirts",
    category: Category.MensShirts,
    description: "Discover a variety of men's shirts for casual and formal wear",
  },
  {
    icon: IconShoe,
    title: "Men's Shoes",
    category: Category.MensShoes,
    description: "Shop the latest collection of men's shoes and footwear",
  },
  {
    icon: IconDeviceWatch,
    title: "Men's Watches",
    category: Category.MensWatches,
    description: "Find the perfect timepiece from our selection of men's watches",
  },
  {
    icon: IconDeviceWatch,
    title: "Women's Watches",
    category: Category.WomensWatches,
    description: "Choose from a wide range of stylish women's watches",
  },
  {
    icon: IconBriefcase,
    title: "Women's Bags",
    category: Category.WomensBags,
    description: 'Discover fashionable bags for women in various styles and sizes',
  },
  {
    icon: IconDeviceWatch,
    title: "Women's Jewellery",
    category: Category.WomensJewellery,
    description: "Add a touch of elegance with our collection of women's jewellery",
  },
  {
    icon: IconSunglasses,
    title: 'Sunglasses',
    category: Category.Sunglasses,
    description: 'Protect your eyes and stay stylish with our selection of sunglasses',
  },
  {
    icon: IconCar,
    title: 'Automotive',
    category: Category.Automotive,
    description: 'Find automotive parts and accessories for your vehicle',
  },
  {
    icon: IconMotorbike,
    title: 'Motorcycle',
    category: Category.Motorcycle,
    description: 'Shop motorcycle gear, parts, and accessories for your ride',
  },
  {
    icon: IconBulb,
    title: 'Lighting',
    category: Category.Lighting,
    description: 'Illuminate your space with a variety of lighting options and fixtures',
  },
];

export default function Sidebar() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [cartOpened, { toggle: toggleCart, close: closeCart }] = useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const { classes, theme } = useStyles();
  const matches = useMediaQuery('(min-width: 768px)');
  const navigate = useNavigate();

  const { products } = useCartContext();

  console.log('products', products);

  const user = getAccessToken();

  const navigateToLogin = () => {
    navigate('/login');
  };

  const links = mockdata.map((item) => (
    <UnstyledButton
      className={classes.subLink}
      key={item.title}
      onClick={() => navigate(`/categories/${item.category}`)}
    >
      <Group noWrap align="flex-start">
        <ThemeIcon size={34} variant="default" radius="md">
          <item.icon size={rem(22)} color={theme.fn.primaryColor()} />
        </ThemeIcon>
        <div>
          <Text size="sm" fw={500}>
            {item.title}
          </Text>
          <Text size="xs" color="dimmed">
            {item.description}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  ));

  return (
    <Box pb={120}>
      <Header height={60} px="md">
        <Group position="apart" sx={{ height: '100%' }}>
          <Image src="./tflogo.jpeg" height={55} width={55} />

          <Group sx={{ height: '100%' }} spacing={0} className={classes.hiddenMobile}>
            <NavLink
              component={Link}
              label="Home"
              to="/home"
              className={classes.link}
              active={location.pathname === '/home'}
              key="Home"
              variant="subtle"
            />
            <HoverCard width={800} position="bottom" radius="md" shadow="md" withinPortal>
              <HoverCard.Target>
                <NavLink
                  component={Link}
                  label={
                    <Center inline>
                      <Box component="span" mr={5}>
                        Categories
                      </Box>
                      <IconChevronDown size={16} color={theme.fn.primaryColor()} />
                    </Center>
                  }
                  to="/categories"
                  className={classes.link}
                  active={location.pathname === '/categories'}
                  key="Categories"
                  variant="subtle"
                />
              </HoverCard.Target>

              <HoverCard.Dropdown sx={{ overflow: 'hidden' }}>
                <Group position="apart" px="md">
                  <Text fw={500}>Categories</Text>
                  <Anchor component={Link} to="/categories" fz="xs">
                    View all
                  </Anchor>
                </Group>

                <Divider
                  my="sm"
                  mx="-md"
                  color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'}
                />

                <SimpleGrid cols={3} spacing={0}>
                  {links}
                </SimpleGrid>

                <div className={classes.dropdownFooter}>
                  <Group position="apart">
                    <div>
                      <Text fw={500} fz="sm">
                        Get started
                      </Text>
                      <Text size="xs" color="dimmed">
                        See more
                      </Text>
                    </div>
                    <Button variant="default">Get started</Button>
                  </Group>
                </div>
              </HoverCard.Dropdown>
            </HoverCard>
            <NavLink
              component={Link}
              label="Wishlist"
              to="/wishlist"
              className={classes.link}
              active={location.pathname === '/wishlist'}
              key="Wishlist"
              variant="subtle"
            />
          </Group>

          <Group>
            <Group className={classes.hiddenMobile}>
              {user ? (
                <Badge>{user}</Badge>
              ) : (
                <Group>
                  <Button onClick={navigateToLogin} variant="default">
                    Log in
                  </Button>
                  <Button onClick={navigateToLogin}>Sign up</Button>
                </Group>
              )}
            </Group>
            <ActionIcon variant="transparent " onClick={toggleCart}>
              <IconShoppingCart size="1.5rem" />
            </ActionIcon>
            <Burger
              opened={drawerOpened}
              size="1.5rem"
              onClick={toggleDrawer}
              className={classes.hiddenDesktop}
            />
          </Group>
        </Group>
      </Header>

      <Drawer
        opened={cartOpened}
        onClose={closeCart}
        size={matches ? '35%' : '100%'}
        position="right"
        padding="md"
        title="Cart"
        style={{
          minWidth: 300,
        }}
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(60)})`} mx="-md">
          <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />

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
          <Button mt={30} disabled={products.length === 0} radius="xs" w="100%" size="lg">
            Go to checkout
          </Button>
        </ScrollArea>
      </Drawer>
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        className={classes.hiddenDesktop}
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(60)})`} mx="-md">
          <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />

          <NavLink
            component={Link}
            label="Home"
            to="/home"
            className={classes.link}
            active={location.pathname === '/home'}
            key="Home"
            variant="subtle"
          />
          <UnstyledButton className={classes.link} onClick={toggleLinks}>
            <Center inline>
              <Box component="span" mr={5}>
                Categories
              </Box>
              <IconChevronDown size={16} color={theme.fn.primaryColor()} />
            </Center>
          </UnstyledButton>
          <Collapse in={linksOpened}>{links}</Collapse>
          <NavLink
            component={Link}
            label="Wishlist"
            to="/wishlist"
            className={classes.link}
            active={location.pathname === '/wishlist'}
            key="Wishlist"
            variant="subtle"
          />

          <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />

          {user ? (
            <Badge>{user}</Badge>
          ) : (
            <Group position="center" grow pb="xl" px="md">
              <Button onClick={navigateToLogin} variant="default">
                Log in
              </Button>
              <Button onClick={navigateToLogin}>Sign up</Button>
            </Group>
          )}
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
