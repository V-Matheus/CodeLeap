import { ComponentProps } from 'react';
import { Loader } from './Loader';

interface ButtonProps extends ComponentProps<'button'> {
  styles?: 'base' | 'danger' | 'save' | 'submit';
  isLoading?: boolean;
}

export function Button({
  styles = 'base',
  isLoading = false,
  ...props
}: ButtonProps) {
  let buttonStyle: string;

  switch (styles) {
    case 'danger':
      buttonStyle = 'bg-red color-white bg-red/90';
      break;
    case 'save':
      buttonStyle = 'bg-green color-white bg-green/90';
      break;
    case 'submit':
      buttonStyle = 'bg-primary hover:bg-primary-600';
      break;
    default:
      buttonStyle = 'border-1 border-gray-medium text-black';
  }

  return (
    <button
      disabled={isLoading}
      className={`flex items-center justify-center w-[120px] h-[32px] rounded-lg box-border font-bold ${buttonStyle} `}
      {...props}
    >
      {isLoading ? <Loader /> : props.children}
    </button>
  );
}
