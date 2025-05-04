'use client';
import { getCareers } from '@/services/careers';
import { useCallback, useEffect } from 'react';
import { Post } from '@/components/Post';
import { Loader } from './Loader';
import { useInfiniteQuery } from '@tanstack/react-query';
import Skeleton from 'react-loading-skeleton';

export function PostsList() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteQuery({
    queryKey: ['careers'],
    queryFn: async ({ pageParam = false }) => {
      const response = await getCareers({ getNext: Boolean(pageParam) });
      return response;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.next || undefined,
  });

  const handleScroll = useCallback(() => {
    const mainElement = document.querySelector('main');
    if (!mainElement) return;

    const { scrollTop, scrollHeight, clientHeight } = mainElement;

    if (
      scrollTop + clientHeight >= scrollHeight - 50 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  useEffect(() => {
    const mainElement = document.querySelector('main');
    if (!mainElement) return;

    mainElement.addEventListener('scroll', handleScroll);

    return () => {
      mainElement.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center mt-6 w">
        <Skeleton count={2} height={180} width={736} />
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500">Failed to load posts.</p>;
  }

  if (!data) return null;

  return (
    <ul className="space-y-6 mt-6">
      {data.pages.map((page) =>
        page.results.map((post) => (
          <li key={post.id}>
            <Post data={post} />
          </li>
        )),
      )}
      {isFetchingNextPage && (
        <div className="flex justify-center items-center mt-6">
          <Loader />
        </div>
      )}
      {!hasNextPage && (
        <div className="flex justify-center items-center mt-6">
          <p className="text-gray-dark">Ops, No more posts</p>
        </div>
      )}
    </ul>
  );
}
