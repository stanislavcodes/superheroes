import { Grid,GridItem } from '@chakra-ui/react';
import { Superhero } from '~/types/Superhero';
import { SuperheroCard } from '../SuperheroCard';
import { CardSkeleton } from '../CardSkeleton';

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
      templateColumns="repeat(auto-fill, 300px)"
      gap={6}
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
            <GridItem>
              <SuperheroCard key={superhero.id} superhero={superhero} />
            </GridItem>
          ))}
        </>
      )}
    </Grid>
  );
};
