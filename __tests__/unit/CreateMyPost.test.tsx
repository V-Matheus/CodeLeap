import { fireEvent, render } from '@testing-library/react';
import { act } from 'react';
import { CreateMyPost } from '@/components/CreateMyPost';

const mockMutate = jest.fn();

jest.mock('@/hooks/usePostActions', () => ({
  usePostActions: jest.fn(() => ({
    createPost: {
      mutate: mockMutate,
    },
  })),
}));

jest.mock('react-redux', () => ({
  useSelector: jest.fn(() => ({
    username: 'Victor',
  })),
}));

describe('CreateMyPost', () => {
  it('should render the create my post component', () => {
    const screen = render(<CreateMyPost />);

    const title = screen.getByText('What’s on your mind?');
    expect(title).toBeInTheDocument();

    const titleLabel = screen.getByLabelText('Title');
    expect(titleLabel).toBeInTheDocument();

    const titleInput = screen.getByPlaceholderText('Hello world');
    expect(titleInput).toBeInTheDocument();

    const contentLabel = screen.getByLabelText('Content');
    expect(contentLabel).toBeInTheDocument();

    const contentTextarea = screen.getByPlaceholderText('Content here');
    expect(contentTextarea).toBeInTheDocument();

    const submitButton = screen.getByRole('button', { name: 'Create' });
    expect(submitButton).toBeInTheDocument();
  });

  it('should create a post', async () => {
    const screen = render(<CreateMyPost />);

    const titleInput = screen.getByPlaceholderText('Hello world');
    const contentTextarea = screen.getByPlaceholderText('Content here');
    const submitButton = screen.getByRole('button', { name: 'Create' });

    expect(titleInput).toBeInTheDocument();
    expect(contentTextarea).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    await act(async () => {
      fireEvent.change(titleInput, { target: { value: 'Hello world' } });
      fireEvent.change(contentTextarea, { target: { value: 'Content here' } });
      fireEvent.submit(submitButton);
    });

    expect(mockMutate);
    expect(mockMutate).toHaveBeenCalledWith(
      {
        username: 'Victor',
        title: 'Hello world',
        content: 'Content here',
      },
      expect.any(Object),
    );
  });
});
