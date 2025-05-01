import { Modal } from '@/app/components/Modal';
import { act, fireEvent, render } from '@testing-library/react';

describe('Modal', () => {
  it('should render the modal with children content', () => {
    const screen = render(
      <Modal onClose={jest.fn()} open>
        <h1>Modal Title</h1>
        <p>This is the modal content</p>
      </Modal>,
    );

    const title = screen.getByText('Modal Title');
    const content = screen.getByText('This is the modal content');

    expect(title).toBeInTheDocument();
    expect(content).toBeInTheDocument();
  });

  it('should have the correct classes for styling', () => {
    const screen = render(
      <Modal onClose={jest.fn()} open>
        <p>Modal Content</p>
      </Modal>,
    );

    const modal = screen.getByRole('dialog');
    expect(modal).toHaveClass(
      'absolute w-full h-full inset-0 flex items-center justify-center bg-black/35 z-50',
    );
  });

  it('should close the modal when clicking outside the article', async () => {
    const handleClose = jest.fn();

    const screen = render(
      <Modal onClose={handleClose} open>
        <article>
          <h1>Modal Title</h1>
        </article>
      </Modal>,
    );

    const modal = screen.getByRole('dialog');
    const article = screen.getByText('Modal Title').closest('article');

    expect(modal).toBeVisible();
    expect(article).toBeVisible();

    await act(async () => {
      fireEvent.click(modal);
    });

    screen.rerender(
      <Modal onClose={handleClose} open={false}>
        <article>
          <h1>Modal Title</h1>
          <p>This is the modal content</p>
        </article>
      </Modal>,
    );

    expect(handleClose).toHaveBeenCalledTimes(1);
    expect(article).not.toBeVisible();
  });
});
