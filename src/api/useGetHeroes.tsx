import { useQuery } from '@tanstack/react-query';
import { useEffect,useState } from 'react';
import { Superhero } from '~/types/Superhero';
import { SuperheroesCount } from '~/types/SuperheroesCount';
import { get } from '~/utils/requests';

const API_URL = import.meta.env.VITE_API_URL;

export const useGetHeroes = () => {
  const [page, setPage] = useState(1);

  useEffect(() => {
    console.log(page);
  }, [page]);

  const prevPage = () => {
    if (page > 1) {
      setPage(prev => prev - 1);
    }
  };

  const nextPage = () => {
    if (page < pages) {
      setPage(prev => prev + 1);
    }
  };

  const { data: heroesCount = { count: 0 }, refetch } = useQuery({
    queryKey: ['heroes-count'],
    queryFn: () => get<SuperheroesCount>(`${API_URL}/superheroes/count`),
  });

  const pages = Math.ceil(heroesCount.count / 5);

  const heroesQuery = useQuery({
    queryKey: ['heroes', page],
    queryFn: () => get<Superhero[]>(`${API_URL}/superheroes?page=${page}`),
    refetchOnWindowFocus: false,
  });

  return {
    ...heroesQuery,
    pages,
    page,
    prevPage,
    nextPage,
    refetchHeroes: heroesQuery.refetch,
    refetchCount: refetch,
  };
};
