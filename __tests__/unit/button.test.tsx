import { Button } from '@/app/components/Button';
import { render } from '@testing-library/react';

describe('Button', () => {
  it('should render the button with default styles', () => {
    const screen = render(<Button>Default</Button>);

    const button = screen.getByRole('button', { name: 'Default' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass(
      'flex items-center justify-center w-[120px] h-[32px] rounded-lg box-border font-bold border-1 border-black text-black',
    );
  });

  it('should render the button with danger styles', () => {
    const screen = render(<Button styles="danger">Default</Button>);

    const button = screen.getByRole('button', { name: 'Default' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass(
      'flex items-center justify-center w-[120px] h-[32px] rounded-lg box-border font-bold bg-red color-white bg-red/90',
    );
  });

  it('should render the button with save styles', () => {
    const screen = render(<Button styles="save">Default</Button>);

    const button = screen.getByRole('button', { name: 'Default' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass(
      'flex items-center justify-center w-[120px] h-[32px] rounded-lg box-border font-bold bg-green color-white bg-green/90',
    );
  });

  it('should render the button with submit styles', () => {
    const screen = render(<Button styles="submit">Default</Button>);

    const button = screen.getByRole('button', { name: 'Default' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass(
      'flex items-center justify-center w-[120px] h-[32px] rounded-lg box-border font-bold bg-primary hover:bg-primary-600',
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
