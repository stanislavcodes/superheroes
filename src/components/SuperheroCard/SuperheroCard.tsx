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
            src="https://images.lifestyleasia.com/wp-content/uploads/sites/7/2022/02/28155940/The-Batman-1.jpg"
            alt="Chakra UI"
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
            <Button w={'100%'} colorScheme="purple">
              Open
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </>
  );
};
