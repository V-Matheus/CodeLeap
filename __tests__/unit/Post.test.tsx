import { Post } from '@/app/components/Post';
import { render } from '@testing-library/react';
import { formatDistanceToNowStrict } from 'date-fns';

jest.mock('date-fns', () => ({
  formatDistanceToNowStrict: jest.fn(),
}));

describe('Post', () => {
  it('should render the post component', () => {
    (formatDistanceToNowStrict as jest.Mock).mockReturnValue('25 minutes ago');

    const mockPost = {
      id: '1',
      title: 'My First Post at CodeLeap Network!',
      content:
        'Curabitur suscipit suscipit tellus. Phasellus consectetuer vestibulum elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
      created_datetime: new Date(),
      username: 'Victor',
    };

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
});
