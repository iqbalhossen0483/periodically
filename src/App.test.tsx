import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

test("render App component", () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const appComponent = screen.getByRole("application");
  expect(appComponent).toBeInTheDocument();
});
