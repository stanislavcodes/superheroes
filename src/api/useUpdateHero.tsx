import { useMutation,useQueryClient } from '@tanstack/react-query';
import { Superhero } from '~/types/Superhero';
import { put } from '~/utils/requests';

const API_URL = import.meta.env.VITE_API_URL;

export const useUpdateHero = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (superhero: Superhero) =>
      put<Superhero>(`${API_URL}/superheroes/${superhero.id}`, superhero),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['heroes', 'heroes-count'],
      });
      
      if (onSuccess) {
        onSuccess();
      }
    },
  });
};
