import { render, screen } from "@testing-library/react";
import { BrowserRouter, Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import App from "./App";

describe("app component", () => {
  test("checking rendering App component", () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const appComponent = screen.getByRole("application");
    expect(appComponent).toBeInTheDocument();
  });

  test("render home route", () => {
    const history = createMemoryHistory();
    render(
      <Router navigator={history} location={"/"}>
        <App />
      </Router>
    );
    userEvent.click(screen.getByTestId("home-container"));
    expect(screen.getByTestId("home-container")).toBeInTheDocument();
  });

  test("render json route", () => {
    const history = createMemoryHistory();
    render(
      <Router navigator={history} location={"/json/:query"}>
        <App />
      </Router>
    );
    userEvent.click(screen.getByTestId("json-page"));
    expect(screen.getByTestId("json-page")).toBeInTheDocument();
  });

  test("render 404 route", () => {
    const history = createMemoryHistory();
    render(
      <Router navigator={history} location={"/*"}>
        <App />
      </Router>
    );
    userEvent.click(screen.getByText("404, Page not found"));
    expect(screen.getByText("404, Page not found")).toBeInTheDocument();
  });
});
