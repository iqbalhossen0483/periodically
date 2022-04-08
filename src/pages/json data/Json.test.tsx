import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import PostProvider from "../../contex api/PostProvider";
import { PostSchema } from "../../hooks/PostFunction";
import "@testing-library/dom";
import Home from "../home/Home";
import Json from "./Json";

const store: PostSchema = {
  pageNumber: 1,
  currentPage: 1,
  handlePagination: jest.fn(),
  pagePost: [
    {
      author: "rakib",
      objectID: "0943",
      created_at: "3 am",
      title: "this is my blog",
      url: "url",
    },
  ],
  loading: false,
};

describe("json page", () => {
  test("render json page", () => {
    render(<Json />);
    const jsonComponent = screen.getByTestId("json-page");
    expect(jsonComponent).toBeInTheDocument();
  });
  test("Check if rendered raw JSON is the correct one", () => {
    render(
      <BrowserRouter>
        <PostProvider store={store}>
          <Home />
        </PostProvider>
      </BrowserRouter>
    );
    render(<Json />);
    const jsonData = screen.getByText("this is my blog");
    expect(jsonData).toBeInTheDocument();
  });
});
