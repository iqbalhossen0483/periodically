import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import usePost from "../../hooks/usePost";
import Spinner from "../../utilitize/Spinner";
import PaginationComponent from "./Pagination";

function Home() {
  const navigate = useNavigate();
  const post = usePost();

  const headers: string[] = ["Title", "URL", "Author", "Created_at"];

  if (post?.loading) {
    return <Spinner />;
  }

  return (
    <div className="m-5" data-testid="home-container">
      <Table>
        <TableHead data-testid="table-header">
          <TableRow>
            {headers.map((item, index) => (
              <TableCell align="center" key={index}>
                <p className="text-xl font-semibold">{item}</p>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        {post?.pagePost && (
          <TableBody data-testid="table-body">
            {post?.pagePost.map((item, index) => {
              const date = item.created_at.slice(0, 10);
              const time = item.created_at.slice(11, 19);
              return (
                <TableRow
                  data-testid={`rowLink-${index}`}
                  onClick={() => navigate(`/json/${item.objectID}`)}
                  hover
                  key={index}
                >
                  <TableCell>
                    <span className="break-words">{item.title}</span>
                  </TableCell>
                  <TableCell>
                    <span>{item.url?.slice(0, 50) || "url"}</span>
                  </TableCell>
                  <TableCell>{item.author}</TableCell>
                  <TableCell>
                    {date} {time}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        )}
      </Table>

      <div className="pagination">
        {post?.pagePost && <PaginationComponent />}
      </div>
    </div>
  );
}

export default Home;
