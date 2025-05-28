'use client';
import { Button } from '@/components/Button';
import { logout, signUp } from '@/services/auth';
import { setUser } from '@/store/slices/user-slice';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch } from 'react-redux';

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit } = useForm<{ username: string }>();
  const { push } = useRouter();
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<{ username: string }> = async (data) => {
    setIsLoading(true);
    try {
      const { ok, user } = await signUp(data.username);

      if (ok && user) {
        dispatch(setUser(user));
        push('/');
      }
    } catch (error) {
      console.error('Error during sign up:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    logout();
  }, []);

  return (
    <main className="flex flex-1 justify-center items-center h-screen">
      <article className="bg-white w-[90%] max-w-[660px] p-6 rounded-2xl border-1 border-gray-medium">
        <h2 className="text-lg md:text-[22px] font-bold">
          Welcome to CodeLeap network!
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="flex flex-col gap-2 text-sm md:text-base">
            Please enter your username
            <input
              className="placeholder:text-sm placeholder:text-gray-light pl-3 py-2 border-1 border-gray-dark rounded-lg"
              type="text"
              placeholder="John doe"
              {...register('username', { required: true })}
            />
          </label>
          <section className="flex justify-end gap-4 mt-10">
            <Button type="submit" styles={'submit'} isLoading={isLoading}>
              ENTER
            </Button>
          </section>
        </form>
      </article>
    </main>
  );
}
