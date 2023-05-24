import { Box } from '@chakra-ui/react';
import { useGetHeroes } from '~/api/useGetHeroes';
import { SuperheroesList } from '~/components/SuperheroesList';

export const Home = () => {
  const { data: superheroes, isLoading } = useGetHeroes();

  return (
    <Box py={10} px={6} as="main">
      <SuperheroesList isLoading={isLoading} superheroes={superheroes ?? []} />
    </Box>
  );
};
