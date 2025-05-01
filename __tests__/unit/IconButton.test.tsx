import { IconButton } from '@/app/components/Button';
import { render } from '@testing-library/react';
import Trash from '@/assets/ic_baseline-delete-forever.svg';
import Image from 'next/image';

describe('IconButton', () => {
  it('should render the icon button with the default size', () => {
    const screen = render(
      <IconButton
        icon={<Image src={Trash} alt="Delete Post" />}
        aria-label="Delete"
      />,
    );

    const button = screen.getByRole('button', { name: 'Delete' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('w-6 h-6');

    const icon = screen.getByAltText('Delete Post');
    expect(icon).toBeInTheDocument();
  });

  it('should render the icon button with a medium size', () => {
    const screen = render(
      <IconButton
        icon={<Image src={Trash} alt="Delete Post" />}
        aria-label="Delete"
        size="medium"
      />,
    );

    const button = screen.getByRole('button', { name: 'Delete' });
    expect(button).toHaveClass('w-8 h-8');
  });

  it('should render the icon button with a large size', () => {
    const screen = render(
      <IconButton
        icon={<Image src={Trash} alt="Delete Post" />}
        aria-label="Delete"
        size="large"
      />,
    );

    const button = screen.getByRole('button', { name: 'Delete' });
    expect(button).toHaveClass('w-10 h-10');
  });
});
