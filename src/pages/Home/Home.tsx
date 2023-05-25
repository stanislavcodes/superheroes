import { Flex } from '@chakra-ui/react';
import { useGetHeroes } from '~/api/useGetHeroes';
import { Pagination } from '~/components/Pagination';
import { SuperheroesList } from '~/components/SuperheroesList';

export const Home = () => {
  const {
    data: superheroes,
    isLoading,
    pages,
    page,
    nextPage,
    prevPage,
  } = useGetHeroes();

  return (
    <Flex p={6} gap={6} direction={'column'} as="main">
      <Pagination
        currentPage={page}
        totalPages={pages}
        nextPage={nextPage}
        prevPage={prevPage}
      />

      <SuperheroesList isLoading={isLoading} superheroes={superheroes ?? []} />
    </Flex>
  );
};
