import { Loader } from "@/app/components/Loader";
import { render } from "@testing-library/react";

describe("Loader", () => {
  it("should render the Loader component", () => {
    const screen = render(<Loader />);

    const loader = screen.getByRole("status");
    expect(loader).toBeInTheDocument();
    expect(loader).toHaveClass(
      "inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-gray-dark border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]",
    );
    expect(loader).toHaveTextContent("Loading...");
  });
})