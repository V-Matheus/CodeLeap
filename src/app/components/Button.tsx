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
      buttonStyle = 'bg-red text-white active:bg-red/80';
      break;
    case 'save':
      buttonStyle = 'bg-green text-white active:bg-green/80';
      break;
    case 'submit':
      buttonStyle = 'bg-primary text-white active:bg-primary/80';
      break;
    default:
      buttonStyle =
        'border-1 border-black text-black bg-white active:bg-gray-light';
  }

  return (
    <button
      disabled={isLoading}
      className={`flex items-center justify-center w-[120px] h-[32px] transition-colors rounded-lg box-border font-bold cursor-pointer ${buttonStyle} `}
      {...props}
    >
      {isLoading ? <Loader /> : props.children}
    </button>
  );
}
