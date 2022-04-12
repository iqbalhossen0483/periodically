import { screen, render, within } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import PostProvider from "../../contex api/PostProvider";
import { PostSchema } from "../../hooks/PostFunction";
import "@testing-library/dom";
import Home from "./Home";

const store: PostSchema = {
  pageNumber: 1,
  currentPage: 1,
  handlePagination: jest.fn(),
  pagePost: [
    {
      author: "rakib",
      objectID: "0943",
      created_at: "3 am",
      title: "this is a blog",
      url: "url",
    },
  ],
  loading: false,
};

describe("home page", () => {
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(
      <BrowserRouter>
        <PostProvider store={store}>
          <Home />
        </PostProvider>
      </BrowserRouter>
    );
  });

  test("Home page is rendering", () => {
    const homeComponent = screen.getByTestId("home-container");
    expect(homeComponent).toBeInTheDocument();
  });

  describe("pagination testing", () => {
    test("pagination is rendering", async () => {
      const pagination = await screen.findByTestId("pagination");
      expect(pagination).toBeInTheDocument();
    });

    test("Check the pagination component at least have 1 page", async () => {
      const page = await screen.findByText("1");
      expect(page).toBeInTheDocument();
    });
  });

  describe("test the table", () => {
    test("table is rendering", async () => {
      const table = await screen.findByRole("table");
      expect(table).toBeInTheDocument();
    });

    test("check at least one row is containing news in the table", async () => {
      const news = await screen.findByText(/this is a blog/i);
      expect(news).toBeInTheDocument();
    });

    test("Check if the news row contains title, url, author, created_at properties", () => {
      const tableHeader = screen.getByTestId("table-header");
      const title = within(tableHeader).getByText("Title");
      const url = within(tableHeader).getByText("URL");
      const author = within(tableHeader).getByText("Author");
      const created_at = within(tableHeader).getByText("Created_at");

      expect(tableHeader).toBeInTheDocument();
      expect(title).toBeInTheDocument();
      expect(url).toBeInTheDocument();
      expect(author).toBeInTheDocument();
      expect(created_at).toBeInTheDocument();
    });
  });
});
