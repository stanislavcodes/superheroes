import {
  Box,
  Button,
  CloseButton,
  Flex,
  Image,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { ChangeEvent, Dispatch, createRef, useState } from 'react';

interface ImageUploaderProps {
  addImage: Dispatch<React.SetStateAction<File | null>>;
  removeImage?: (name: string) => void;
  isLoading: boolean;
  defaultImage?: string;
}

export const ImageUploader = ({
  addImage,
  removeImage,
  isLoading,
  defaultImage,
}: ImageUploaderProps) => {
  const [isLargeFileAlertOpen, setIsLargeFileAlertOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(
    defaultImage ?? null,
  );

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      if (file?.size > 1048576) {
        setPreviewImage(null);
        setIsLargeFileAlertOpen(true);

        setTimeout(() => {
          setIsLargeFileAlertOpen(false);
        }, 2000);

        return;
      }

      addImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCancel = () => {
    if (defaultImage === previewImage && removeImage) {
      const name = defaultImage?.split('/').pop() ?? '';

      removeImage(name);
    }

    setPreviewImage(null);
    addImage(null);
  };

  const handleButtonClick = () => {
    // Simulate a click on the hidden file input element
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const fileInputRef = createRef<HTMLInputElement>();

  const boxStyles = {
    position: 'absolute',
    top: '0',
    left: '0',
    w: '100%',
    h: '100%',
  };

  const flexCenterStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <Flex
      w={'100%'}
      aspectRatio={1 / 1}
      rounded={'lg'}
      bg={'gray.100'}
      justify={'center'}
      align={'center'}
      overflow={'hidden'}
      position={'relative'}
    >
      {isLargeFileAlertOpen ? (
        <Box
          sx={{ ...boxStyles, ...flexCenterStyles }}
          zIndex={999}
          bgColor={'whiteAlpha.700'}
        >
          <Text fontWeight="bold" color="red.400">
            {'1MB max'}
          </Text>
        </Box>
      ) : (
        <>
          {previewImage && (
            <Box sx={boxStyles}>
              <Image
                h={'100%'}
                src={previewImage}
                alt="Preview"
                userSelect={'none'}
                objectFit={'cover'}
              />
            </Box>
          )}

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />

          {isLoading ? (
            <Box
              sx={{ ...boxStyles, ...flexCenterStyles }}
              zIndex={777}
              bgColor={'whiteAlpha.700'}
            >
              <Spinner />
            </Box>
          ) : (
            <>
              <Button
                onClick={handleButtonClick}
                colorScheme="cyan"
                isLoading={isLoading}
                isDisabled={isLoading}
                loadingText="Uploading"
                size={{ base: 'sm', md: 'md' }}
              >
                {previewImage ? 'Change' : 'Upload'}
              </Button>

              {previewImage && (
                <CloseButton
                  bg="gray.100"
                  _hover={{ bg: 'cyan.500' }}
                  variant={'outline'}
                  position={'absolute'}
                  isDisabled={isLoading}
                  right={{ base: 1, md: 2 }}
                  top={{ base: 1, md: 2 }}
                  size={{ base: 'sm', md: 'md' }}
                  onClick={handleCancel}
                />
              )}
            </>
          )}
        </>
      )}
    </Flex>
  );
};
