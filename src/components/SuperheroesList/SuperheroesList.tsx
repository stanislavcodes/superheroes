import { Flex } from '@chakra-ui/react';
import { Superhero } from '~/types/Superhero';
import { SuperheroCard } from '../SuperheroCard';

interface SuperheroesListProps {
  superheroes: Superhero[];
}

export const SuperheroesList = ({ superheroes }: SuperheroesListProps) => {
  return (
    <Flex p={6} gap={4} direction={'column'}>
      {superheroes.map(superhero => (
        <SuperheroCard key={superhero.id} superhero={superhero} />
      ))}
    </Flex>
  );
};
