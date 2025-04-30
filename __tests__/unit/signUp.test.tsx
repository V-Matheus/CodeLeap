import Home from "@/app/page";
import { render } from "@testing-library/react";

describe("SignUp", () => {
  it("should render the sign-up page", () => {
    render(<Home  />)
  })
})