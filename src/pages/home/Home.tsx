import { Button, Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import Json from "../json data/Json";

function Home() {
  const [post, setPost] = useState<Post[] | []>([]);
  const [showJson, setShowJson] = useState<number>(-1);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pagePost, setPagePost] = useState<Post[] | null>(null);

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
        if (!data.length) clearInterval(interval);

        setPost((prev) => [...prev, ...data]);
        //page count increase;
        setPageNumber((prev) => prev + 1);
      }, 10000);
    })();
  }, []);

  //json component toggle;
  function toggleJson(index: number) {
    if (showJson === index) {
      setShowJson(-1);
    } else {
      setShowJson(index);
    }
  }

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
  }

  return (
    <div className='post-container' onClick={() => setShowJson(-1)}>
      {pagePost
        ? pagePost.map((item, index) => {
            const date = item.created_at.slice(0, 10);
            const time = item.created_at.slice(11, 19);
            return (
              <div key={index} className='post'>
                <h2 className='title'>{item.title}</h2>
                <p className='author'>Author: {item.author}</p>
                <p className='text-lg mb-10'>
                  {date} {time}
                </p>
                <Button
                  className='see-post'
                  href={item.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  variant='outlined'
                >
                  See Post
                </Button>
                <Button
                  className='json'
                  onClick={(e) => {
                    toggleJson(index);
                    e.stopPropagation();
                  }}
                >
                  json
                </Button>
                {showJson === index && (
                  <Json data={item} showJson={showJson} fn={setShowJson} />
                )}
              </div>
            );
          })
        : ""}
      <div className='pagination'>
        {pageNumber > 1 && (
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
