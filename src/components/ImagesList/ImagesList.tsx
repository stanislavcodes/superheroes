import { Grid,Image } from '@chakra-ui/react';
interface ImagesListProps {
  images: string[];
}

export const ImagesList = ({ images }: ImagesListProps) => {
  const finalImages = images.length > 3 ? images.slice(0, 3) : images;

  return (
    <Grid
      minW={'280px'}
      maxW={'100%'}
      gridTemplateColumns={`repeat(${images.length}, 1fr)`}
      gridTemplateRows={`min-content`}
      gap={4}
    >
      {finalImages.map(image => (
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
