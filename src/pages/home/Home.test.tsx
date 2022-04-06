import { Pagination, Table, TableRow } from "@mui/material";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import PaginationComponent from "./Pagination";
import Home from "./Home";

describe("home page", () => {
  test("render Home page", () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    const homeComponent = screen.getByTestId("home-container");
    expect(homeComponent).toBeInTheDocument();
  });

  describe("pagination testing", () => {
    test("render pagination component", () => {
      render(<PaginationComponent />);
      const pagination = screen.getByRole("presentation");
      expect(pagination).toBeInTheDocument();
    });

    test("check pagination works", () => {
      render(<Pagination count={3} />);
      const pagination = screen.getByText(3);
      expect(pagination).toBeInTheDocument();
    });
  });

  describe("test the table", () => {
    test("render table component", () => {
      render(<Table />);
      const table = screen.getByRole("table");
      expect(table).toBeInTheDocument();
    });

    test("check weather table row clickable", () => {
      render(<TableRow />);
      fireEvent.click(screen.getByRole("row"));
      expect(screen.getByRole("row")).not.toBeDisabled();
    });
  });
});
