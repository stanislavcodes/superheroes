import { Flex, Heading } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useGetHeroes } from '~/api/useGetHeroes';
import { Pagination } from '~/components/Pagination';
import { SuperheroesList } from '~/components/SuperheroesList';
import { useAuthContext } from '~/contexts/AuthContext';

export const Home = () => {
  const { isSignedIn } = useAuthContext();
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
      <Heading as={'h1'} size={'lg'} textAlign={'center'}>
        Welcome to Heroes 👋!
      </Heading>

      <SuperheroesList isLoading={isLoading} superheroes={superheroes ?? []} />

      {pages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={pages}
          nextPage={nextPage}
          prevPage={prevPage}
          isLoading={isLoading}
        />
      )}

      {!isLoading && !superheroes && (
        <>
          <Heading as={'h2'} textAlign={'center'} my={'auto'}>
            {'No heroes yet! 😔'}
            <br />
            {'But you can add them!'}
          </Heading>

          {!isSignedIn && (
            <Heading
              as={'h2'}
              size={'md'}
              textAlign={'center'}
              color={'cyan.500'}
            >
              Please sign in to use all features
            </Heading>
          )}
        </>
      )}
    </Flex>
  );
};
