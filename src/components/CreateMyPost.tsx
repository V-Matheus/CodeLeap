'use client';
import { postCareer } from '@/services/careers';
import { Button } from './Button';
import { RootState } from '@/store/store';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

export function CreateMyPost() {
  const user = useSelector((state: RootState) => state.user);

  const { register, handleSubmit } = useForm<{
    title: string;
    content: string;
  }>();

  const onSubmit: SubmitHandler<{ title: string; content: string }> = async (
    data,
  ) => {
    try {
      const response = await postCareer({
        username: user.username,
        title: data.title,
        content: data.content,
      });

      console.log(response);
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
