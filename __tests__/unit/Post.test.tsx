import {Post } from '@/app/components/Post';
import { render } from '@testing-library/react';

describe('Post', () => {
  it('should render the post component', () => {
    const screen = render(<Post />);

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

    const content = screen.getByText(/Curabitur suscipit suscipit tellus/i);
    expect(content).toBeInTheDocument();
  });
});
