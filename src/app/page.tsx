import { CreateMyPost } from "@/components/CreateMyPost";
import { Post } from "@/components/Post";

export default function Home() {
  const mockPosts = [
    {
      content:
        'Curabitur suscipit suscipit tellus. Phasellus consectetuer vestibulum elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
      created_datetime: new Date('2025-05-01T10:00:00Z'),
      id: '1',
      title: 'My First Post at CodeLeap Network!',
      username: 'Victor',
    },
    {
      content:
        'Maecenas egestas arcu quis ligula mattis placerat. Duis vel nibh at velit scelerisque suscipit. Duis lobortis massa imperdiet quam.',
      created_datetime: new Date('2023-05-02T14:30:00Z'),
      id: '2',
      title: 'Exploring the CodeLeap Platform',
      username: 'Alice',
    },
    {
      content:
        'Aenean posuere, tortor sed cursus feugiat, nunc augue blandit nunc, eu sollicitudin urna dolor sagittis lacus.',
      created_datetime: new Date('2023-05-03T08:15:00Z'),
      id: '3',
      title: 'Tips for Writing Better Code',
      username: 'John',
    },
  ];

  return (
    <section className="flex fle-1 flex-col w-[800px] h-screen">
      <header className="flex items-center pl-[37px] h-20 bg-primary">
        <h1 className="text-[22px] text-white font-bold">CodeLeap Network</h1>
      </header>
      <main className="flex flex-1 flex-col bg-white p-6 overflow-auto">
        <CreateMyPost />
        <ul className="space-y-6 mt-6">
          {mockPosts.map((post) => (
            <li key={post.id}>
              <Post data={post} />
            </li>
          ))}
        </ul>
      </main>
    </section>
  );
}
