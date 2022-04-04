import { render, screen } from "@testing-library/react";
import PostProvider from "./PostProvider";

test("context api component works", () => {
  render(
    <PostProvider>
      <p>It should work</p>
    </PostProvider>
  );
  const provider = screen.getByText(/it should work/i);
  expect(provider).toBeInTheDocument();
});
