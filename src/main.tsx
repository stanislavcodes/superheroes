import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import AppRouter from '~/AppRouter';
import { AuthContextProvider } from '~/contexts/AuthContext';
import './index.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <ChakraProvider>
          <RouterProvider router={AppRouter} />
        </ChakraProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
