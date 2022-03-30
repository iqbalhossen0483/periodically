import { render, screen } from "@testing-library/react";
import App from "./App";
import Home from "./pages/home/Home";

test("render App component", () => {
  render(<App />);
  const appComponent = screen.getByText("test app");
  expect(appComponent).toBeInTheDocument();
});

test("render Home component", async () => {
  render(<Home />);
  const homeComponent = await screen.findByText("test home");
  expect(homeComponent).toBeInTheDocument();
});
