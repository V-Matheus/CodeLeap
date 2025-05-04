import { Button } from '@/components/Button';
import { render } from '@testing-library/react';

describe('Button', () => {
  it('should render the button with default styles', () => {
    const screen = render(<Button>Default</Button>);

    const button = screen.getByRole('button', { name: 'Default' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass(
      'flex items-center justify-center w-full max-w-[120px] h-[32px] transition-colors rounded-lg box-border font-bold cursor-pointer border-1 border-black text-black bg-white active:bg-gray-light',
    );
  });

  it('should render the button with danger styles', () => {
    const screen = render(<Button styles="danger">Default</Button>);

    const button = screen.getByRole('button', { name: 'Default' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass(
      'flex items-center justify-center w-full max-w-[120px] h-[32px] transition-colors rounded-lg box-border font-bold cursor-pointer bg-red text-white active:bg-red/80',
    );
  });

  it('should render the button with save styles', () => {
    const screen = render(<Button styles="save">Default</Button>);

    const button = screen.getByRole('button', { name: 'Default' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass(
      'flex items-center justify-center w-full max-w-[120px] h-[32px] transition-colors rounded-lg box-border font-bold cursor-pointer bg-green text-white active:bg-green/80',
    );
  });

  it('should render the Loader when the isLoading property is passed to the button', () => {
    const screen = render(
      <Button isLoading styles="submit">
        Default
      </Button>,
    );

    const button = screen.getByRole('button', { name: 'Loading...' });
    expect(button).toBeInTheDocument();
  });
});
