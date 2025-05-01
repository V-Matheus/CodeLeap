import Image from 'next/image';
import Trash from '@/assets/ic_baseline-delete-forever.svg';
import Edit from '@/assets/bx_bx-edit.svg';
import { formatDistanceToNowStrict } from 'date-fns';

export interface PostProps {
  data: {
    id: string;
    username: string;
    created_datetime: Date;
    title: string;
    content: string;
  };
}

export function Post({ data }: PostProps) {
  return (
    <article className="flex flex-col w-full">
      <header className="flex justify-between items-center p-6 bg-primary rounded-t-2xl border-primary">
        <h2 className="text-[22px] text-white font-bold">{data.title}</h2>
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
          <address className="text-gray-dark text-lg font-bold">
            @{data.username}
          </address>
          <time className="text-gray-light text-lg">
            {formatDistanceToNowStrict(data.created_datetime, {
              addSuffix: true,
            })}
          </time>
        </div>

        <p className="text-lg">{data.content}</p>
      </section>
    </article>
  );
}
