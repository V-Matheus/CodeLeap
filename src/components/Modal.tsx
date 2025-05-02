'use client';
import { ComponentProps, MouseEvent } from 'react';

interface ModalProps extends ComponentProps<'dialog'> {
  onClose?: () => void;
}

export function Modal({ onClose, ...props }: ModalProps) {
  const handleClickOutside = (event: MouseEvent<HTMLDialogElement>) => {
    const dialog = event.target as HTMLDialogElement;
    if (dialog.tagName === 'DIALOG' && event.target === dialog && onClose) {
      onClose();
    }
  };

  return (
    <dialog
      {...props}
      className="absolute w-full h-full inset-0 flex items-center justify-center bg-black/35 z-50"
      onClick={handleClickOutside}
    >
      <article className="bg-white w-[660px] p-6 rounded-2xl border-1 border-gray-medium">
        {props.children}
      </article>
    </dialog>
  );
}
