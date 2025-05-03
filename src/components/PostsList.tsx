'use client';
import { getCareers, GetCareersResponse } from '@/services/careers';
import { useCallback, useEffect, useState } from 'react';
import { Post } from '@/components/Post';
import { Loader } from './Loader';

export function PostsList() {
  const [getNext, setGetNext] = useState(false);
  const [careers, setCareers] = useState<GetCareersResponse | null>(null);
  const [firstLoad, setFirstLoad] = useState(true);

  const handleMorePosts = useCallback(async () => {
    if (careers && careers.results.length >= careers.count) {
      return;
    }

    const response = await getCareers({ getNext });
    setCareers(response);
    setGetNext(false);
  }, [getNext, careers]);

  useEffect(() => {
    if (getNext || firstLoad) {
      setFirstLoad(false);
      handleMorePosts();
    }
  }, [handleMorePosts, getNext, firstLoad]);

  const handleScroll = useCallback(() => {
    if (careers && careers.results.length >= careers.count) {
      return;
    }

    const mainElement = document.querySelector('main');
    if (!mainElement) return;

    const { scrollTop, scrollHeight, clientHeight } = mainElement;

    if (scrollTop + clientHeight >= scrollHeight - 50 && !getNext) {
      setGetNext(true);
    }
  }, [getNext, careers]);

  useEffect(() => {
    const mainElement = document.querySelector('main');
    if (!mainElement) return;

    mainElement.addEventListener('scroll', handleScroll);

    return () => {
      mainElement.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  if (!careers) return null;

  return (
    <ul className="space-y-6 mt-6">
      {careers.results.map((post) => (
        <li key={post.id}>
          <Post data={post} />
        </li>
      ))}
      {careers.results.length >= careers.count && (
        <div className="flex justify-center items-center mt-6">
          <p className="text-gray-dark">Ops, No more posts</p>
        </div>
      )}
      {!firstLoad && getNext && (
        <div className="flex justify-center items-center mt-6">
          <Loader />
        </div>
      )}
    </ul>
  );
}
