import { Grid,Image } from '@chakra-ui/react';
import anonymous from '~/assets/anonymous.png';

interface ImagesListProps {
  images: string[];
}

export const ImagesList = ({ images }: ImagesListProps) => {
  const finalImages = images.length > 3 ? images.slice(0, 3) : images;

  return (
    <Grid
      minW={'280px'}
      maxW={images.length === 1 ? '50%' : '100%'}
      gridTemplateColumns={`repeat(${images.length || 1}, 1fr)`}
      gridTemplateRows={`min-content`}
      justifyItems={'center'}
      gap={4}
    >
      {finalImages.length ? (
        <>
          {finalImages.map(image => (
            <Image
              key={image}
              rounded={'lg'}
              flexGrow={1}
              aspectRatio={1 / 1}
              h={'100%'}
              maxH={'30vh'}
              objectFit="cover"
              src={image}
              alt="Superhero image"
              fallbackSrc={anonymous}
            />
          ))}
        </>
      ) : (
        <>
          <Image
            rounded={'lg'}
            flexGrow={1}
            h={'100%'}
            maxW={'60%'}
            objectFit="cover"
            src={anonymous}
            alt="Superhero image"
          />
        </>
      )}
    </Grid>
  );
};
