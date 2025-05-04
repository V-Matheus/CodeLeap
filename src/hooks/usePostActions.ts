import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  postCareer,
  editCareer,
  deleteCareer,
  PostCareersRequest,
  Career,
  EditCareerRequest,
} from '@/services/careers';
import { useState } from 'react';

export function usePostActions() {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const createPost = useMutation<Career, Error, PostCareersRequest>({
    mutationFn: async (post: PostCareersRequest) => {
      setIsLoading(true);
      const result = await postCareer(post);
      setIsLoading(false);
      return result;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['careers'] }),
  });

  const editPost = useMutation<
    Career,
    Error,
    { id: number; post: EditCareerRequest }
  >({
    mutationFn: async ({ id, post }) => {
      setIsLoading(true);
      const result = await editCareer(id, post);
      setIsLoading(false);
      return result;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['careers'] }),
  });

  const deletePost = useMutation<Career, Error, number>({
    mutationFn: async (id) => {
      setIsLoading(true);
      const result = await deleteCareer(id);
      setIsLoading(false);
      return result;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['careers'] }),
  });

  return {
    createPost,
    editPost,
    deletePost,
    isLoading,
  };
}
