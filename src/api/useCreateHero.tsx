import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Superhero } from '~/types/Superhero';
import { post } from '~/utils/requests';


const API_URL = import.meta.env.VITE_API_URL;

export const useCreateHero = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (superhero: Superhero) => (
      post<Superhero>(`${API_URL}/superheroes`, superhero)
    ),
    onSuccess: () => {
      queryClient.invalidateQueries(['heroes']);
    }
  });
};
