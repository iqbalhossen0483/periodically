import { render, screen } from "@testing-library/react";
import { BrowserRouter, Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import "@testing-library/jest-dom";
import App from "./App";

describe("app component", () => {
  test("render App component", () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const appComponent = screen.getByRole("application");
    expect(appComponent).toBeInTheDocument();
  });

  test("check home route, is routing", () => {
    const history = createMemoryHistory();
    render(
      <Router navigator={history} location={"/"}>
        <App />
      </Router>
    );
    userEvent.click(screen.getByRole("main"));
    expect(screen.getByRole("main")).toBeInTheDocument();
  });

  test("check json route, is routing", () => {
    const history = createMemoryHistory();
    render(
      <Router navigator={history} location={"/json/:query"}>
        <App />
      </Router>
    );
    userEvent.click(screen.getByRole("listitem"));
    expect(screen.getByRole("listitem")).toBeInTheDocument();
  });
});
