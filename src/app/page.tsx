import { CreateMyPost } from '@/components/CreateMyPost';
import dynamic from 'next/dynamic';

export const revalidate = 0;

const PostsList = dynamic(() =>
  import('@/components/PostsList').then((module) => module.PostsList),
);

export default async function Home() {
  return (
    <section className="flex fle-1 flex-col w-[800px] h-screen">
      <header className="flex items-center pl-[37px] h-20 bg-primary">
        <h1 className="text-[22px] text-white font-bold">CodeLeap Network</h1>
      </header>
      <main className="flex flex-1 flex-col bg-white p-6 overflow-auto">
        <CreateMyPost />
        <PostsList />
      </main>
    </section>
  );
}
