import { render, screen } from "@testing-library/react";
import App from "./App";
import Home from "./pages/home/Home";
import Json from "./pages/json data/Json";

test("render App component", () => {
  render(<App />);
  const appComponent = screen.getByRole("application");
  expect(appComponent).toBeInTheDocument();
});

test("render Home page", async () => {
  render(<Home />);
  const homeComponent = await screen.findByRole("table");
  expect(homeComponent).toBeInTheDocument();
});

test("render json page", () => {
  render(<Json />);
  const homeComponent = screen.getByRole("columnheader");
  expect(homeComponent).toBeInTheDocument();
});
