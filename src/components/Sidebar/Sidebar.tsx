import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { CreateForm } from '~/components/CreateForm';

interface SidebarProps {
  toggleSidebar: () => void;
  isOpen: boolean;
}

export const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
  const { onClose } = useDisclosure();

  const handleClose = () => {
    toggleSidebar();
    onClose();
  };

  return (
    <Drawer
      size={{ base: 'full', md: 'lg', '4xl': 'xl' }}
      isOpen={isOpen}
      placement="right"
      onClose={handleClose}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton right={2} top={2} zIndex={999} bg={'gray.100'} />

        <DrawerBody>
          <CreateForm />
        </DrawerBody>

        <DrawerFooter>
          <Button
            variant="outline"
            mr={3}
            onClick={handleClose}
            size={{ base: 'md', '4xl': 'lg' }}
          >
            Cancel
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
