import {
  Box,
  Collapse,
  createStyles,
  Group,
  NavLink,
  Text,
  ThemeIcon,
  UnstyledButton,
} from '@mantine/core';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  control: {
    fontWeight: 500,
    display: 'block',
    width: '100%',
    marginBottom: theme.spacing.md,
    marginTop: theme.spacing.md,
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    fontSize: theme.fontSizes.sm,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
  },

  link: {
    fontWeight: 500,
    display: 'block',
    textDecoration: 'none',
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    paddingLeft: 31,
    marginLeft: 30,
    fontSize: theme.fontSizes.sm,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    borderLeft: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
  },

  chevron: {
    transition: 'transform 200ms ease',
  },
}));

interface LinksGroupProps {
  icon: React.ElementType;
  label: string;
  initiallyOpened?: boolean;
  to?: string;
  links?: { label: string; to: string }[];
}
interface LinkComponentProps {
  icon: React.ElementType;
  label: string;
  to: string;
}

const LinkComponent = ({ icon: Icon, label, to }: LinkComponentProps) => {
  const { classes } = useStyles();

  return (
    <UnstyledButton className={classes.control} component={Link} to={to}>
      <Group position="apart" spacing={1}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <ThemeIcon variant="light" size={30}>
            <Icon size={18} />
          </ThemeIcon>
          <Box ml="md">{label}</Box>
        </Box>
      </Group>
    </UnstyledButton>
  );
};

const LinksGroup = ({
  icon: Icon,
  label,
  to,
  initiallyOpened,
  links,
}: LinksGroupProps) => {
  const { classes, theme } = useStyles();
  const hasLinks = Array.isArray(links);
  const location = useLocation();

  const [opened, setOpened] = useState(initiallyOpened || false);
  const ChevronIcon = theme.dir === 'ltr' ? IconChevronRight : IconChevronLeft;

  const items = (hasLinks ? links : []).map((link) => (
    <NavLink
      component={Link}
      label={link.label}
      to={link.to}
      className={classes.link}
      active={location.pathname === link.to}
      key={link.label}
      variant="subtle"
    />
  ));

  if (to) {
    return <LinkComponent icon={Icon} label={label} to={to} />;
  }

  return (
    <>
      <UnstyledButton onClick={() => setOpened((o) => !o)} className={classes.control}>
        <Group position="apart" spacing={0}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ThemeIcon variant="light" size={30}>
              <Icon size={18} />
            </ThemeIcon>
            <Box ml="md">{label}</Box>
          </Box>
          {hasLinks && (
            <ChevronIcon
              className={classes.chevron}
              size={14}
              stroke={1.5}
              style={{
                transform: opened
                  ? `rotate(${theme.dir === 'rtl' ? -90 : 90}deg)`
                  : 'none',
              }}
            />
          )}
        </Group>
      </UnstyledButton>
      {hasLinks ? (
        <Collapse in={opened} w="90%">
          {items}
        </Collapse>
      ) : null}
    </>
  );
};

export default LinksGroup;
