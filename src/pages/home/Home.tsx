import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [pagePost, setPagePost] = useState<Post[] | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [post, setPost] = useState<Post[] | []>([]);
  const navigate = useNavigate();

  async function loadData(pageNum: string): Promise<Post[]> {
    const url: string = `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${pageNum}`;
    const res = await fetch(url);
    const data = await res.json();
    return data.hits;
  }

  useEffect(() => {
    (async () => {
      let initialData = await loadData("0");
      setPost(initialData);
      setPagePost(initialData);

      //call api after every 10 seconds;
      let pageNum: number = 0;
      const interval: NodeJS.Timer = setInterval(async () => {
        pageNum++;
        const data = await loadData(pageNum.toString());

        // clear the interval after getting all data;
        if (!data.length) {
          clearInterval(interval);
        }

        setPost((prev) => [...prev, ...data]);
        //page count increase;
        setPageNumber((prev) => prev + 1);
      }, 10000);
    })();
  }, []);

  //pagination function;
  function handlePagination(pageNum: number) {
    const start = pageNum * 20 + 1;
    const end = start + 20;
    const pageData = [];
    for (let index = start; index < end; index++) {
      if (post[index]) {
        pageData.push(post[index]);
      }
    }
    setPagePost(pageData);
    setCurrentPage((prev) => prev + 1);
  }

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
