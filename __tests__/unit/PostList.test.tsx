import { render, screen } from '@testing-library/react';
import { PostsList } from '@/components/PostsList';
import { useInfiniteQuery } from '@tanstack/react-query';

jest.mock('@/services/careers', () => ({
  getCareers: jest.fn(),
}));

jest.mock('@tanstack/react-query', () => ({
  useInfiniteQuery: jest.fn(),
}));

jest.mock('@/components/Post', () => ({
  Post: ({ data }: { data: { id: number; title: string } }) => (
    <div data-testid="post">{data.title}</div>
  ),
}));

jest.mock('react-loading-skeleton', () => {
  const Skeleton = () => <div data-testid="Skeleton" />;
  Skeleton.displayName = 'Skeleton';
  return Skeleton;
});

describe('PostsList', () => {
  it('should show skeleton when loading', () => {
    (useInfiniteQuery as jest.Mock).mockReturnValue({
      isLoading: true,
      data: null,
    });

    render(<PostsList />);

    const skeletons = screen.getByTestId('Skeleton');
    expect(skeletons).toBeVisible();
  });

  it('should render posts when data is loaded', async () => {
    (useInfiniteQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      data: {
        pages: [
          {
            results: [
              { id: 1, title: 'Post 1' },
              { id: 2, title: 'Post 2' },
            ],
          },
        ],
      },
      hasNextPage: false,
      isFetchingNextPage: false,
    });

    render(<PostsList />);

    const posts = await screen.findAllByTestId('post');
    expect(posts).toHaveLength(2);
    expect(posts[0]).toHaveTextContent('Post 1');
    expect(posts[1]).toHaveTextContent('Post 2');
  });

  it('should display a loader when fetching the next page', async () => {
    (useInfiniteQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      data: {
        pages: [
          {
            results: [{ id: 1, title: 'Post 1' }],
          },
        ],
      },
      hasNextPage: true,
      isFetchingNextPage: true,
    });

    render(<PostsList />);

    const loader = screen.getByText('Loading...');
    expect(loader).toBeInTheDocument();
  });

  it('should display a message when there are no more posts', async () => {
    (useInfiniteQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      data: {
        pages: [
          {
            results: [{ id: 1, title: 'Post 1' }],
          },
        ],
      },
      hasNextPage: false,
      isFetchingNextPage: false,
    });

    render(<PostsList />);

    const noMorePostsMessage = screen.getByText(/no more posts/i);
    expect(noMorePostsMessage).toBeInTheDocument();
  });

});
