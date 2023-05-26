import {
AlertDialog,
AlertDialogBody,
AlertDialogContent,
AlertDialogFooter,
AlertDialogHeader,
AlertDialogOverlay,
Button,
} from '@chakra-ui/react';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  cancelRef: React.MutableRefObject<null>;
  question: string;
  description: string;
}

export const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  cancelRef,
  question,
  description,
}: ConfirmDialogProps) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isCentered
    >
      <AlertDialogOverlay>
        <AlertDialogContent maxWidth="sm">
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {question}
          </AlertDialogHeader>

          <AlertDialogBody>{description}</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef.current} onClick={onClose}>
              Cancel
            </Button>

            <Button colorScheme="red" onClick={handleConfirm} ml={3}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
