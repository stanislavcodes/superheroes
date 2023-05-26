import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import AppRouter from '~/AppRouter';
import { AuthContextProvider } from '~/contexts/AuthContext';
import { StorageContextProvider } from './contexts/StorageContext';
import './index.css';

const breakpoints = {
  sm: '370px',
  md: '768px',
  lg: '960px',
  xl: '1200px',
  '2xl': '1536px',
  '3xl': '1900px',
  '4xl': '2530px',
};

const theme = extendTheme({ breakpoints });
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <StorageContextProvider>
          <ChakraProvider theme={theme}>
            <RouterProvider router={AppRouter} />
          </ChakraProvider>
        </StorageContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
