import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Superhero } from '~/types/Superhero';
import { del } from '~/utils/requests';

const API_URL = import.meta.env.VITE_API_URL;

export const useDeleteHero = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => del<Superhero>(`${API_URL}/superheroes/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['heroes', 'heroes-count'],
      });
      navigate('/');
    },
  });
};
