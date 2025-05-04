'use client';

import Image from 'next/image';
import Trash from '@/assets/ic_baseline-delete-forever.svg';
import Edit from '@/assets/bx_bx-edit.svg';
import { formatDistanceToNowStrict } from 'date-fns';
import { Modal } from './Modal';
import { useState } from 'react';
import { Button, IconButton } from './Button';
import { Career } from '@/services/careers';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Bounce, toast } from 'react-toastify';
import { AnimatePresence, motion } from 'framer-motion';
import { usePostActions } from '@/hooks/usePostActions';

interface PostProps {
  data: Career;
}

export function Post({ data }: PostProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'delete' | 'edit' | null>(null);
  const { deletePost, editPost } = usePostActions();

  async function handleDelete() {
    deletePost.mutate(data.id, {
      onSuccess: () => {
        toast.success('Career deleted', {
          position: 'bottom-right',
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          transition: Bounce,
        });
        setIsModalOpen(false);
      },
      onError: (error) => {
        console.error('Error delete post:', error);
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
        setIsModalOpen(false);
      },
    });
  }

  const { register, handleSubmit, reset, setValue } = useForm<{
    title: string;
    content: string;
  }>();

  setValue('title', data.title);
  setValue('content', data.content);

  const handleEdit: SubmitHandler<{ title: string; content: string }> = async (
    request,
  ) => {
    editPost.mutate(
      {
        id: data.id,
        post: {
          title: request.title,
          content: request.content,
        },
      },
      {
        onSuccess() {
          reset();

          toast.success('Career edited', {
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

          setIsModalOpen(false);
        },
        onError(error) {
          console.error('Error edit post:', error);
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
          reset();
          setIsModalOpen(false);
        },
      },
    );
  };

  return (
    <AnimatePresence>
      <motion.article
        className="flex flex-col w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <header className="flex justify-between items-center p-6 bg-primary rounded-t-2xl border-primary">
          <h2 className="text-lg mb:text-[22px] text-white font-bold">{data.title}</h2>
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
            <address className="text-gray-dark text-base md:text-lg font-bold">
              @{data.username}
            </address>
            <time className="text-gray-light text-base md:text-lg">
              {formatDistanceToNowStrict(data.created_datetime, {
                addSuffix: true,
              })}
            </time>
          </div>

          <p className="text-base md:text-lg">{data.content}</p>
        </section>

        {isModalOpen && (
          <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <h2 className="text-[22px] font-bold">
              {modalType === 'edit'
                ? 'Edit Post'
                : 'Are you sure you want to delete this item?'}
            </h2>
            {modalType === 'edit' && (
              <form onSubmit={handleSubmit(handleEdit)}>
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
                <section className="flex justify-end gap-4 mt-10">
                  <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>

                  <Button type="submit" styles="save">
                    Save
                  </Button>
                </section>
              </form>
            )}

            {modalType === 'delete' && (
              <section className="flex justify-end gap-4 mt-10">
                <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>

                <Button styles="danger" onClick={handleDelete}>
                  Delete
                </Button>
              </section>
            )}
          </Modal>
        )}
      </motion.article>
    </AnimatePresence>
  );
}
