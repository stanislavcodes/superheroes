import { Grid, Image } from '@chakra-ui/react';

interface ImagesListProps {
  images: string[];
}

export const ImagesList = ({ images }: ImagesListProps) => {
  return (
    <Grid
      gridTemplateColumns={`repeat(${images.length}, 1fr)`}
      gap={4}
    >
      {images.map(image => (
        <Image
          rounded={'lg'}
          flexGrow={1}
          maxH={'360px'}
          objectFit="cover"
          src={image}
          alt="Chakra UI"
        />
      ))}
    </Grid>
  );
};
