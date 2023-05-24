import { useQuery } from '@tanstack/react-query';
import { Superhero } from '~/types/Superhero';
import { get } from '~/utils/requests';

const API_URL = import.meta.env.VITE_API_URL;

export const useGetHero = (id: string) => {
  return useQuery({
    queryKey: [id],
    queryFn: () => get<Superhero>(`${API_URL}/superheroes/${id}`),
    refetchOnWindowFocus: false,
  });
};
