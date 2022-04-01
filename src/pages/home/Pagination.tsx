import usePost from "../../hooks/usePost";
import React from "react";
import { Pagination } from "@mui/material";

function PaginationComponent() {
  const post = usePost();

  let currentPage: number;
  if (post?.currentPage) {
    currentPage = post.currentPage + 1;
  } else {
    currentPage = 1;
  }

  return (
    <div>
      <Pagination
        onChange={(e: any, value: number) => post?.handlePagination(value - 1)}
        page={currentPage}
        count={post?.pageNumber}
        color='secondary'
      />
    </div>
  );
}

export default PaginationComponent;
