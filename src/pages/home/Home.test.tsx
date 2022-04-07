import { screen, render } from "@testing-library/react";
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
  test("Home page is rendering", () => {
    render(
      <BrowserRouter>
        <PostProvider store={store}>
          <Home />
        </PostProvider>
      </BrowserRouter>
    );
    const homeComponent = screen.getByTestId("home-container");
    expect(homeComponent).toBeInTheDocument();
  });

  describe("pagination testing", () => {
    test("pagination is rendering", async () => {
      render(
        <BrowserRouter>
          <PostProvider store={store}>
            <Home />
          </PostProvider>
        </BrowserRouter>
      );
      const pagination = await screen.findByTestId("pagination");
      expect(pagination).toBeInTheDocument();
    });

    test("Check the pagination component at least have 1 page", async () => {
      render(
        <BrowserRouter>
          <PostProvider store={store}>
            <Home />
          </PostProvider>
        </BrowserRouter>
      );
      const page = await screen.findByText("1");
      expect(page).toBeInTheDocument();
    });
  });

  describe("test the table", () => {
    test("table is rendering", async () => {
      render(
        <BrowserRouter>
          <PostProvider store={store}>
            <Home />
          </PostProvider>
        </BrowserRouter>
      );
      const table = await screen.findByRole("table");
      expect(table).toBeInTheDocument();
    });

    test("check at least one row is containing news in the table", async () => {
      render(
        <BrowserRouter>
          <PostProvider store={store}>
            <Home />
          </PostProvider>
        </BrowserRouter>
      );
      const news = await screen.findByText(/rakib/i);
      expect(news).toBeInTheDocument();
    });

    test("Check if the news row contains title, url, author, created_at properties", () => {
      render(
        <BrowserRouter>
          <PostProvider store={store}>
            <Home />
          </PostProvider>
        </BrowserRouter>
      );
      const tableHeader = screen.getByTestId("table-header");
      const title = screen.getByText("Title");
      const url = screen.getByText("URL");
      const author = screen.getByText("Author");
      const created_at = screen.getByText("Created_at");

      expect(tableHeader).toBeInTheDocument();
      expect(title).toBeInTheDocument();
      expect(url).toBeInTheDocument();
      expect(author).toBeInTheDocument();
      expect(created_at).toBeInTheDocument();
    });
  });
});
