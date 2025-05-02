'use client';
import { postCareer } from '@/services/careers';
import { Button } from './Button';
import { RootState } from '@/store/store';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Bounce, toast } from 'react-toastify';

export function CreateMyPost() {
  const user = useSelector((state: RootState) => state.user);

  const { register, handleSubmit, reset } = useForm<{
    title: string;
    content: string;
  }>();

  const onSubmit: SubmitHandler<{ title: string; content: string }> = async (
    data,
  ) => {
    try {
      await postCareer({
        username: user.username,
        title: data.title,
        content: data.content,
      });

      reset();

      toast.success('Career created', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      });
    } catch (error) {
      console.error('Error during sign up:', error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 w-full border-1 border-gray-medium rounded-2xl p-6"
    >
      <h2 className="font-bold text-[22px]">What’s on your mind?</h2>
      <label className="flex flex-col gap-2">
        Title
        <input
          className="placeholder:text-sm placeholder:text-gray-light pl-3 py-2 border-1 border-gray-dark rounded-lg"
          type="text"
          placeholder="Hello world"
          {...register('title')}
        />
      </label>

      <label className="flex flex-col gap-2">
        Content
        <textarea
          className="placeholder:text-sm placeholder:text-gray-light pl-3 py-2 border-1 border-gray-dark rounded-lg resize-none"
          placeholder="Content here"
          {...register('content')}
        />
      </label>

      <Button styles="submit" type="submit" className="self-end">
        Create
      </Button>
    </form>
  );
}
