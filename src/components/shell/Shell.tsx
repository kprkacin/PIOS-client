import { AppShell } from '@mantine/core';
import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { Sidebar } from '../sidebar';

const pageTransition = {
  type: 'spring',
  ease: 'linear',
  duration: 0.5,
};

const Shell: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <AppShell
      padding="md"
      navbar={<Sidebar />}
      // header={<Header />}
      styles={(theme) => ({
        main: {
          overflow: 'hidden',
        },
      })}
    >
      <Outlet />
    </AppShell>
  );
};
export default Shell;
