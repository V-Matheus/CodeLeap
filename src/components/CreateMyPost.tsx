'use client';
import { Button } from './Button';
import { RootState } from '@/store/store';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Bounce, toast } from 'react-toastify';
import { usePostActions } from '@/hooks/usePostActions';

export function CreateMyPost() {
  const user = useSelector((state: RootState) => state.user);
  const { createPost, isLoading } = usePostActions();

  const { register, handleSubmit, reset } = useForm<{
    title: string;
    content: string;
  }>({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<{ title: string; content: string }> = async (
    data,
  ) => {
    createPost.mutate(
      {
        username: user.username,
        title: data.title,
        content: data.content,
      },
      {
        onSuccess: () => {
          reset();

          toast.success('Career created', {
            position: 'bottom-right',
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
            transition: Bounce,
          });
        },
        onError: (error) => {
          console.error('Error creating post:', error);
          toast.error('Failed to create post.', {
            position: 'bottom-right',
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
            transition: Bounce,
          });
        },
      },
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 w-full border-1 border-gray-medium rounded-2xl p-6"
    >
      <h2 className="font-bold text-lg  md:text-[22px]">What’s on your mind?</h2>
      <label className="flex flex-col gap-2 text-sm md:text-base">
        Title
        <input
          className="placeholder:text-sm placeholder:text-gray-light pl-3 py-2 border-1 border-gray-dark rounded-lg"
          type="text"
          placeholder="Hello world"
          {...register('title', { required: true })}
        />
      </label>

      <label className="flex flex-col gap-2 text-sm md:text-base">
        Content
        <textarea
          className="placeholder:text-sm placeholder:text-gray-light pl-3 py-2 border-1 border-gray-dark rounded-lg resize-none"
          placeholder="Content here"
          {...register('content', { required: true })}
        />
      </label>

      <Button
        styles="submit"
        type="submit"
        className="self-end"
        disabled={isLoading}
        isLoading={isLoading}
      >
        Create
      </Button>
    </form>
  );
}
