import { Button, Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import Json from "../json data/Json";

function Home() {
  const [post, setPost] = useState<Post[]>([]);
  const [pages, setPages] = useState<number>(1);
  const [showJson, setShowJson] = useState<number>(-1);

  async function loadData(): Promise<Post[]> {
    const url: string =
      "https://hn.algolia.com/api/v1/search_by_date?tags=story&page=0";
    const res = await fetch(url);
    const data = await res.json();
    return data.hits;
  }

  useEffect(() => {
    (async () => {
      let initialData = await loadData();
      setPost(initialData);

      //call api after every 10 seconds;
      setInterval(async () => {
        const data = await loadData();
        setPost((prev) => [...prev, ...data]);
        //page count increase;
        setPages((prev) => prev + 1);
      }, 10000);
    })();
  }, []);

  function toggleJson(index: number) {
    if (showJson === index) {
      setShowJson(-1);
    } else {
      setShowJson(index);
    }
  }

  return (
    <div className='post-container' onClick={() => setShowJson(-1)}>
      {post.length
        ? post.map((item, index) => {
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
                {showJson === index && <Json data={item} fn={setShowJson} />}
              </div>
            );
          })
        : ""}
      <div className='pagination'>
        {pages > 1 && <Pagination count={pages} color='secondary' />}
      </div>
    </div>
  );
}

export default Home;
