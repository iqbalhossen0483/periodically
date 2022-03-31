import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import usePost from "../../hooks/usePost";

function Home() {
  const navigate = useNavigate();
  const { pageNumber, pagePost, currentPage, handlePagination } = usePost();

  const headers: string[] = ["Title", "URL", "Author", "Created_at"];

  return (
    <div className='m-5' role='table'>
      {pagePost && (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {headers.map((item, index) => (
                  <TableCell align='center' key={index}>
                    <p className='text-xl font-semibold'>{item}</p>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {pagePost.map((item, index) => {
                const date = item.created_at.slice(0, 10);
                const time = item.created_at.slice(11, 19);
                return (
                  <TableRow
                    onClick={() =>
                      navigate(
                        `/json/${item.objectID}&&${currentPage.toString()}`
                      )
                    }
                    hover
                    key={index}
                  >
                    <TableCell>
                      <span className='break-words'>{item.title}</span>
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
          </Table>
        </TableContainer>
      )}

      <div className='pagination'>
        {pagePost && (
          <Pagination
            onChange={(e, value) => handlePagination(value - 1)}
            count={pageNumber}
            color='secondary'
          />
        )}
      </div>
    </div>
  );
}

export default Home;
