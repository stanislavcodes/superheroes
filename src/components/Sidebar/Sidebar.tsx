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
import { CreateForm } from '../CreateForm';

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
    <Drawer size="lg" isOpen={isOpen} placement="right" onClose={handleClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />

        <DrawerBody>
          <CreateForm />
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={handleClose}>
            Cancel
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
