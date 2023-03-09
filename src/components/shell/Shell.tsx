import { AppShell } from '@mantine/core';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';

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
      // header={<Header />}
      styles={(theme) => ({
        main: {
          overflow: 'hidden',
        },
      })}
    >
      {/* <motion.div
        key={pathname}
        transition={pageTransition}
        // initial={{ x: '20%' }}
        // animate={{ x: 0 }}
      > */}
      <Outlet />
      {/* </motion.div> */}
    </AppShell>
  );
};
export default Shell;
