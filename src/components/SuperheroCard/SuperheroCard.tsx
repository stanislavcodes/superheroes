import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Image,
  Link,
} from '@chakra-ui/react';
import { Link as ReachLink } from 'react-router-dom';
import anonymous from '~/assets/anonymous.png';
import { Superhero } from '~/types/Superhero';

interface SuperheroCardProps {
  superhero: Superhero;
}

export const SuperheroCard = ({ superhero }: SuperheroCardProps) => {
  const { id, nickname } = superhero;

  return (
    <>
      <Card maxW="md" variant={'outline'}>
        <CardHeader>
          <Heading textAlign={'center'} size="md">
            {nickname}
          </Heading>
        </CardHeader>

        <CardBody>
          <Image
            objectFit="cover"
            rounded={'lg'}
            maxW={{ base: '100%', md: '100%' }}
            w={'100%'}
            aspectRatio={1 / 1}
            src={superhero.images[0] || anonymous}
            alt={`${nickname} image`}
            fallbackSrc={anonymous}
          />
        </CardBody>

        <CardFooter
          justify="space-between"
          flexWrap="wrap"
          gap={2}
          sx={{
            '& > button': {
              minW: '136px',
            },
          }}
        >
          <Link as={ReachLink} to={`superhero/${id}`} flex="1">
            <Button w={'100%'} colorScheme="cyan">
              Open
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </>
  );
};
