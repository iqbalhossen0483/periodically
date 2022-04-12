import { render, screen } from "@testing-library/react";
import { BrowserRouter, Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import "@testing-library/dom";
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

  test("render home route", async () => {
    const history = createMemoryHistory();
    render(
      <Router navigator={history} location={"/"}>
        <App />
      </Router>
    );
    const container = await screen.findByTestId("home-container");
    expect(container).toBeInTheDocument();
  });

  test("render json route", () => {
    const history = createMemoryHistory();
    render(
      <Router navigator={history} location={"/json/id"}>
        <App />
      </Router>
    );
    expect(screen.getByTestId("json-page")).toBeInTheDocument();
  });

  test("render 404 route", () => {
    const history = createMemoryHistory();
    render(
      <Router navigator={history} location={"/*"}>
        <App />
      </Router>
    );
    expect(screen.getByText("404, Page not found")).toBeInTheDocument();
  });
});
