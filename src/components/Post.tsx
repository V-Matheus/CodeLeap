'use client';

import Image from 'next/image';
import Trash from '@/assets/ic_baseline-delete-forever.svg';
import Edit from '@/assets/bx_bx-edit.svg';
import { formatDistanceToNowStrict } from 'date-fns';
import { Modal } from './Modal';
import { useState } from 'react';
import { Button, IconButton } from './Button';

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'delete' | 'edit' | null>(null);

  return (
    <article className="flex flex-col w-full">
      <header className="flex justify-between items-center p-6 bg-primary rounded-t-2xl border-primary">
        <h2 className="text-[22px] text-white font-bold">{data.title}</h2>
        <div className="flex space-x-6">
          <IconButton
            icon={<Image src={Trash} alt="Delete Post" />}
            aria-label="Delete"
            onClick={() => {
              setIsModalOpen(true);
              setModalType('delete');
            }}
          />

          <IconButton
            icon={<Image src={Edit} alt="Edit Post" />}
            aria-label="Edit"
            onClick={() => {
              setIsModalOpen(true);
              setModalType('edit');
            }}
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

      {isModalOpen && (
        <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <h2 className="text-[22px] font-bold">
            {modalType === 'edit'
              ? 'Edit Post'
              : 'Are you sure you want to delete this item?'}
          </h2>
          {modalType === 'edit' && (
            <form>
              <label className="flex flex-col gap-2">
                Title
                <input
                  className="placeholder:text-sm placeholder:text-gray-light pl-3 py-2 border-1 border-gray-dark rounded-lg"
                  type="text"
                  placeholder="Hello world"
                />
              </label>

              <label className="flex flex-col gap-2">
                Content
                <textarea
                  className="placeholder:text-sm placeholder:text-gray-light pl-3 py-2 border-1 border-gray-dark rounded-lg resize-none"
                  placeholder="Content here"
                />
              </label>
            </form>
          )}

          <section className="flex justify-end gap-4 mt-10">
            <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>

            <Button styles={modalType === 'edit' ? 'save' : 'danger'}>
              {modalType === 'edit' ? 'Save' : 'Delete'}
            </Button>
          </section>
        </Modal>
      )}
    </article>
  );
}
