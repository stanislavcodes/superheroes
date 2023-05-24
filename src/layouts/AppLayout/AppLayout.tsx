import { Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { Header } from '~/components/Header';

export const AppLayout = () => {
  return (
    <Flex flexDirection="column" minHeight="100vh">
      <Header />

      <Outlet />
    </Flex>
  );
};
