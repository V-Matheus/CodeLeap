import { Modal } from "@/app/components/Modal";
import { render } from "@testing-library/react";

describe('Modal', () => {
  it('should render the modal with children content', () => {
    const screen = render(
      <Modal>
        <h1>Modal Title</h1>
        <p>This is the modal content</p>
      </Modal>
    );

    const title = screen.getByText('Modal Title');
    const content = screen.getByText('This is the modal content');

    expect(title).toBeInTheDocument();
    expect(content).toBeInTheDocument();
  });

  it('should have the correct classes for styling', () => {
    const screen = render(
      <Modal open>
        <p>Modal Content</p>
      </Modal>
    );

    const modal = screen.getByRole('dialog');
    expect(modal).toHaveClass(
      'absolute w-full h-full inset-0 flex items-center justify-center bg-black/35 z-50'
    );
  });
})