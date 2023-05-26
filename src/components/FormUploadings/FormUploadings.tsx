import { Grid } from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';
import { ImageUploader } from '../ImageUploader';

interface FormUploadingsProps {
  addImageOne: Dispatch<SetStateAction<File | null>>;
  addImageTwo: Dispatch<SetStateAction<File | null>>;
  addImageThree: Dispatch<SetStateAction<File | null>>;
  isLoading: boolean;
  images: string[];
  addToImagesToRemove?: (image: string) => void;
}

export const FormUploadings = ({
  isLoading,
  images,
  addImageOne,
  addImageTwo,
  addImageThree,
  addToImagesToRemove,
}: FormUploadingsProps) => {
  return (
    <Grid
      w={'100%'}
      gridTemplateColumns={'repeat(3, 1fr)'}
      gridTemplateRows={'max-content'}
      gap={4}
    >
      <ImageUploader
        addImage={addImageOne}
        removeImage={addToImagesToRemove}
        isLoading={isLoading}
        defaultImage={images[0] ?? null}
      />
      <ImageUploader
        addImage={addImageTwo}
        removeImage={addToImagesToRemove}
        isLoading={isLoading}
        defaultImage={images[1] ?? null}
      />
      <ImageUploader
        addImage={addImageThree}
        removeImage={addToImagesToRemove}
        isLoading={isLoading}
        defaultImage={images[2] ?? null}
      />
    </Grid>
  );
};
