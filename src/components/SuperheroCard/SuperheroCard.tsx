import { Button, Card, Flex, Heading, Image } from '@chakra-ui/react';
import { Superhero } from '~/types/Superhero';

interface SuperheroCardProps {
  superhero: Superhero;
}

export const SuperheroCard = ({ superhero }: SuperheroCardProps) => {
  return (
    <Card
      direction={{ base: 'column', sm: 'row' }}
      overflow="hidden"
      alignItems={'center'}
    >
      <Image
        objectFit="cover"
        maxW={{ base: '100%', sm: '200px' }}
        src="https://images.lifestyleasia.com/wp-content/uploads/sites/7/2022/02/28155940/The-Batman-1.jpg"
        alt={`${superhero.nickname} Image`}
      />

      <Flex w={'100%'} alignItems={'center'} direction={'column'}>
        <Heading textAlign={'center'} size="md" mb={4}>
          {superhero.nickname}
        </Heading>

        <Button w={36} variant="solid" colorScheme="orange">
          View
        </Button>
      </Flex>
    </Card>
  );
};
