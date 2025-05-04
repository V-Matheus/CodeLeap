import { ComponentProps, ReactNode } from 'react';
import { Loader } from './Loader';
import clsx from 'clsx';

interface ButtonProps extends ComponentProps<'button'> {
  styles?: 'base' | 'danger' | 'save' | 'submit';
  isLoading?: boolean;
}

export function Button({
  styles = 'base',
  isLoading = false,
  className,
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
      className={clsx(
        'flex items-center justify-center w-full max-w-[120px] h-[32px] transition-colors rounded-lg box-border font-bold cursor-pointer',
        buttonStyle,
        className,
      )}
      {...props}
    >
      {isLoading ? <Loader /> : props.children}
    </button>
  );
}

interface IconButtonProps extends ComponentProps<'button'> {
  icon: ReactNode;
  size?: 'small' | 'medium' | 'large';
}

export function IconButton({
  className,
  size = 'small',
  icon,
  ...props
}: IconButtonProps) {
  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-8 h-8',
    large: 'w-10 h-10',
  };

  return (
    <button
      className={clsx(
        'flex items-center justify-center rounded-full transition-colors cursor-pointer',
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {icon}
    </button>
  );
}
