import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  postCareer,
  editCareer,
  deleteCareer,
  PostCareersRequest,
  Career,
  EditCareerRequest,
} from '@/services/careers';

export function usePostActions() {
  const queryClient = useQueryClient();

  const createPost = useMutation<Career, Error, PostCareersRequest>({
    mutationFn: (post: PostCareersRequest) => postCareer(post),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['careers'] }),
  });

  const editPost = useMutation<
    Career,
    Error,
    { id: number; post: EditCareerRequest }
  >({
    mutationFn: ({ id, post }) => editCareer(id, post),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['careers'] }),
  });

  const deletePost = useMutation<Career, Error, number>({
    mutationFn: (id) => deleteCareer(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['careers'] }),
  });

  return {
    createPost,
    editPost,
    deletePost,
  };
}
