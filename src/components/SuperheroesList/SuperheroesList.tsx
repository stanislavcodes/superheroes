import { Grid,GridItem } from '@chakra-ui/react';
import { Superhero } from '~/types/Superhero';
import { CardSkeleton } from '../CardSkeleton';
import { SuperheroCard } from '../SuperheroCard';

interface SuperheroesListProps {
  superheroes: Superhero[];
  isLoading: boolean;
}

export const SuperheroesList = ({
  superheroes,
  isLoading,
}: SuperheroesListProps) => {
  return (
    <Grid
      w={'100%'}
      templateColumns={{
        base: 'minmax(300px, 1fr)',
        md: 'repeat(auto-fill, 300px)',
      }}
      gap={6}
      justifyItems={'center'}
      justifyContent={'center'}
    >
      {isLoading ? (
        <>
          <GridItem>
            <CardSkeleton />
          </GridItem>
          <GridItem>
            <CardSkeleton />
          </GridItem>
          <GridItem>
            <CardSkeleton />
          </GridItem>
          <GridItem>
            <CardSkeleton />
          </GridItem>
          <GridItem>
            <CardSkeleton />
          </GridItem>
        </>
      ) : (
        <>
          {superheroes.map(superhero => (
            <SuperheroCard key={superhero.id} superhero={superhero} />
          ))}
        </>
      )}
    </Grid>
  );
};
