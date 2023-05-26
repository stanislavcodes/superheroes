import { Box,Button,CloseButton,Flex,Image,Spinner } from '@chakra-ui/react';
import { ChangeEvent,Dispatch,createRef,useState } from 'react';

interface ImageUploaderProps {
  addImage: Dispatch<React.SetStateAction<File | null>>;
  isLoading: boolean;
}

export const ImageUploader = ({ addImage, isLoading }: ImageUploaderProps) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      addImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
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
          zIndex={999}
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
          >
            {previewImage ? 'Change' : 'Upload image'}
          </Button>

          {previewImage && (
            <CloseButton
              bg="gray.100"
              _hover={{ bg: 'cyan.500' }}
              variant={'outline'}
              position={'absolute'}
              isDisabled={isLoading}
              right={2}
              top={2}
              onClick={() => {
                setPreviewImage(null);
                addImage(null);
              }}
            />
          )}
        </>
      )}
    </Flex>
  );
};
