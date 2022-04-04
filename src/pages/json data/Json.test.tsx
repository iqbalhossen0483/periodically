import { render, screen } from "@testing-library/react";
import Json from "./Json";

test("render json page", () => {
  render(<Json />);
  const homeComponent = screen.getByRole("listitem");
  expect(homeComponent).toBeInTheDocument();
});
