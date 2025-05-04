import { Post } from '@/components/Post';
import { act, fireEvent, render } from '@testing-library/react';
import { formatDistanceToNowStrict } from 'date-fns';
import { deleteCareer, editCareer } from '@/services/careers';

jest.mock('date-fns', () => ({
  formatDistanceToNowStrict: jest.fn(),
}));

jest.mock('@/services/careers', () => ({
  deleteCareer: jest.fn(),
  editCareer: jest.fn(),
}));

describe('Post', () => {
  const mockPost = {
    id: 1,
    title: 'My First Post at CodeLeap Network!',
    content:
      'Curabitur suscipit suscipit tellus. Phasellus consectetuer vestibulum elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
    created_datetime: new Date(),
    username: 'Victor',
    author_ip: '192.168.0.1',
  };

  it('should render the post component', () => {
    (formatDistanceToNowStrict as jest.Mock).mockReturnValue('25 minutes ago');

    const screen = render(<Post data={mockPost} />);

    const title = screen.getByText('My First Post at CodeLeap Network!');
    expect(title).toBeInTheDocument();

    const trashIcon = screen.getByRole('img', { name: 'Delete Post' });
    expect(trashIcon).toBeInTheDocument();

    const editIcon = screen.getByRole('img', { name: 'Edit Post' });
    expect(editIcon).toBeInTheDocument();

    const author = screen.getByText('@Victor');
    expect(author).toBeInTheDocument();

    const time = screen.getByText('25 minutes ago');
    expect(time).toBeInTheDocument();

    const content = screen.getByText(
      'Curabitur suscipit suscipit tellus. Phasellus consectetuer vestibulum elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
    );
    expect(content).toBeInTheDocument();
  });

  it('should delete the post when the button of modal has clicked', async () => {
    const screen = render(<Post data={mockPost} />);

    const deleteButton = screen.getByRole('button', { name: 'Delete' });
    expect(deleteButton).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(deleteButton);
    });

    const modalTitle = screen.getByText(
      'Are you sure you want to delete this item?',
    );
    expect(modalTitle).toBeInTheDocument();

    const cancelButton = screen.getByText('Cancel');
    const confirmButton = screen.getByText('Delete');
    expect(cancelButton).toBeInTheDocument();
    expect(confirmButton).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(confirmButton);
    });

    expect(deleteCareer).toHaveBeenCalledTimes(1);
    expect(deleteCareer).toHaveBeenCalledWith(mockPost.id);
  });

  it('should edit the post when the button of modal has clicked', async () => {
    (formatDistanceToNowStrict as jest.Mock).mockReturnValue('25 minutes ago');

    const screen = render(<Post data={mockPost} />);

    const editButton = screen.getByRole('button', { name: 'Edit' });
    expect(editButton).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(editButton);
    });

    const modalTitle = screen.getByText('Edit Post');
    expect(modalTitle).toBeInTheDocument();

    const titleInput = screen.getByPlaceholderText('Hello world');
    const contentTextarea = screen.getByPlaceholderText('Content here');
    expect(titleInput).toBeInTheDocument();
    expect(contentTextarea).toBeInTheDocument();

    expect(titleInput).toHaveValue(mockPost.title);
    expect(contentTextarea).toHaveValue(mockPost.content);

    await act(async () => {
      fireEvent.change(titleInput, { target: { value: 'New Title' } });
      fireEvent.change(contentTextarea, {
        target: { value: 'New Content' },
      });
    });

    const saveButton = screen.getByRole('button', { name: 'Save' });
    expect(saveButton).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(saveButton);
    });

    expect(editCareer).toHaveBeenCalledTimes(1);
    expect(editCareer).toHaveBeenCalledWith(mockPost.id, {
      title: 'New Title',
      content: 'New Content',
    });
  });
});
