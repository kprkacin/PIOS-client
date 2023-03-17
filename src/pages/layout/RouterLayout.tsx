import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import App from '../../App';
import { RequireAuth } from '../../components/auth/RequireAuth';
import Dashboard from '../dashboard/Dashboard';
import Login from './login/Login';

const RouterLayout = () => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <Notifications />
        <Routes>
          <Route
            element={
              <RequireAuth>
                <App />
              </RequireAuth>
            }
          >
            {/* <Route path="*" element={<ProjectListPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/clients" element={<ClientListPage />} />
        <Route path="/clients/:id" element={<ClientDetailsPage />} />
        <Route path="/projects" element={<ProjectListPage />} />
        <Route path="/projects/:id/:tabValue?" element={<ProjectDetailsPage />} />
        */}
            <Route path="*" element={<Dashboard />} />
          </Route>

          <Route path="/login" element={<Login />} />
          {/* <Route path="*" element={<ErrorPage />} /> */}
        </Routes>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

export default RouterLayout;
