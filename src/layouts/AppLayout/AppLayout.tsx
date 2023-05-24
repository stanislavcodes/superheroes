import { Flex } from '@chakra-ui/react';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '~/components/Header';
import { Sidebar } from '~/components/Sidebar/Sidebar';

export const AppLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  return (
    <Flex flexDirection="column" minHeight="100vh">
      <>
      <Header toggleSidebar={toggleSidebar} />

      <Outlet />

      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </>
    </Flex>
  );
};
