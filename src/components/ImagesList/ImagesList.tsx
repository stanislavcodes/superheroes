import { Grid, Image } from '@chakra-ui/react';

interface ImagesListProps {
  images: string[];
}

export const ImagesList = ({ images }: ImagesListProps) => {
  return (
    <Grid
      gridTemplateColumns={`repeat(${images.length}, 1fr)`}
      gridTemplateRows={`min-content`}
      gap={4}
    >
      {images.map(image => (
        <Image
          key={image}
          rounded={'lg'}
          flexGrow={1}
          h={'100%'}
          objectFit="cover"
          src={image}
          alt="Chakra UI"
        />
      ))}
    </Grid>
  );
};
