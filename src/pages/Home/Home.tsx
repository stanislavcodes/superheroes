import { Container } from '@chakra-ui/react';
import { useGetHeroes } from '~/api/useGetHeroes';
import { CreateForm } from '~/components/CreateForm';
import { SuperheroesList } from '~/components/SuperheroesList';

export const Home = () => {
  const { data: superheroes } = useGetHeroes();

  return (
    <Container>
      <CreateForm />
      
      <SuperheroesList superheroes={superheroes ?? []} />
    </Container>
  );
};
