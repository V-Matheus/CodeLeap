import CreateMyPost from '@/app/components/CreateMyPost';
import { render } from '@testing-library/react';

describe('CreateMyPost', () => {
  it('should render the create my post component', () => {
    const screen = render(<CreateMyPost />);

    const title = screen.getByText('What’s on your mind?');
    expect(title).toBeInTheDocument();

    const titleLabel = screen.getByLabelText("Title");
    expect(titleLabel).toBeInTheDocument();

    const titleInput = screen.getByPlaceholderText('Hello world');
    expect(titleInput).toBeInTheDocument();

    const contentLabel = screen.getByLabelText("Content");
    expect(contentLabel).toBeInTheDocument();

    const contentTextarea = screen.getByPlaceholderText('Content here');
    expect(contentTextarea).toBeInTheDocument();

    const submitButton = screen.getByRole('button', { name: 'Create' });
    expect(submitButton).toBeInTheDocument();
  });
});
