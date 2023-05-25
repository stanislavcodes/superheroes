import { Flex } from '@chakra-ui/react';
import { useEffect } from 'react';
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

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [page]);

  return (
    <Flex
      p={6}
      gap={6}
      direction={'column'}
      as="main"
      justify={'space-between'}
      minH={'calc(100vh - 80px)'}
    >
      <SuperheroesList isLoading={isLoading} superheroes={superheroes ?? []} />

      <Pagination
        currentPage={page}
        totalPages={pages}
        nextPage={nextPage}
        prevPage={prevPage}
        isLoading={isLoading}
      />
    </Flex>
  );
};
