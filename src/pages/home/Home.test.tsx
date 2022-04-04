import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Home from "./Home";
import PaginationComponent from "./Pagination";

test("render Home page", () => {
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
  const homeComponent = screen.getByRole("table");
  expect(homeComponent).toBeInTheDocument();
});

test("render pagination component", () => {
  render(<PaginationComponent />);
  const pagination = screen.getByRole("presentation");
  expect(pagination).toBeInTheDocument();
});
