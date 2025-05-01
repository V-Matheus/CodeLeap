import Image from 'next/image';
import Trash from '@/assets/ic_baseline-delete-forever.svg';
import Edit from '@/assets/bx_bx-edit.svg';

export function Post() {
  return (
    <article className="flex flex-col w-full">
      <header className="flex justify-between items-center p-6 bg-primary rounded-t-2xl border-primary">
        <h2 className="text-[22px] text-white font-bold">
          My First Post at CodeLeap Network!
        </h2>
        <div className="flex space-x-6">
          <Image
            src={Trash}
            alt="Delete Post"
            className="cursor-pointer"
            height={30}
            width={30}
          />
          <Image
            src={Edit}
            alt="Edit Post"
            className="cursor-pointer"
            height={30}
            width={30}
          />
        </div>
      </header>
      <section className="flex flex-col p-6 border-1 border-t-0 border-gray-medium rounded-b-2xl">
        <div className="flex justify-between items-center">
          <address className="text-gray-dark font-bold">@Victor</address>
          <time className="text-gray-light font-bold">25 minutes ago</time>
        </div>

        <p className="text-lg">
          Curabitur suscipit suscipit tellus. Phasellus consectetuer vestibulum
          elit. Pellentesque habitant morbi tristique senectus et netus et
          malesuada fames ac turpis egestas. Maecenas egestas arcu quis ligula
          mattis placerat. Duis vel nibh at velit scelerisque suscipit. Duis
          lobortis massa imperdiet quam. Aenean posuere, tortor sed cursus
          feugiat, nunc augue blandit nunc, eu sollicitudin urna dolor sagittis
          lacus. Fusce a quam. Nullam vel sem. Nullam cursus lacinia erat.
        </p>
      </section>
    </article>
  );
}
