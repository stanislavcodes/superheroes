import { useMutation,useQueryClient } from '@tanstack/react-query';
import { Superhero } from '~/types/Superhero';
import { SuperheroPayload } from '~/types/SuperheroPayload';
import { post } from '~/utils/requests';

const API_URL = import.meta.env.VITE_API_URL;

export const useCreateHero = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (superhero: Superhero) =>
      post<SuperheroPayload, Superhero>(`${API_URL}/superheroes`, {
        nickname: superhero.nickname,
        real_name: superhero.real_name,
        origin_description: superhero.origin_description,
        superpowers: superhero.superpowers,
        catch_phrase: superhero.catch_phrase,
        images: superhero.images,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['heroes', 'heroes-count'] });

      if (onSuccess) {
        onSuccess();
      }
    },
  });
};
