import { CreateMyPost } from '@/components/CreateMyPost';
import { Post } from '@/components/Post';
import { getCareers } from '@/services/careers';

export const revalidate = 0;

export default async function Home() {
  const careers = await getCareers();
  
  return (
    <section className="flex fle-1 flex-col w-[800px] h-screen">
      <header className="flex items-center pl-[37px] h-20 bg-primary">
        <h1 className="text-[22px] text-white font-bold">CodeLeap Network</h1>
      </header>
      <main className="flex flex-1 flex-col bg-white p-6 overflow-auto">
        <CreateMyPost />
        <ul className="space-y-6 mt-6">
          {careers.results.map((post) => (
            <li key={post.id}>
              <Post data={post} />
            </li>
          ))}
        </ul>
      </main>
    </section>
  );
}
