import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Superhero } from '~/types/Superhero';
import { del } from '~/utils/requests';

const API_URL = import.meta.env.VITE_API_URL;

export const useDeleteHero = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => del<Superhero>(`${API_URL}/superheroes/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['heroes']);
    },
  });
};
