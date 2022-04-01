import { useEffect, useState } from "react";

export interface PostSchema {
  pagePost: Post[] | null;
  pageNumber: number;
  currentPage: number;
  handlePagination: (pageNum: number) => void;
}

function PostFunction(): PostSchema {
  const [pagePost, setPagePost] = useState<Post[] | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [post, setPost] = useState<Post[] | []>([]);

  //function load data;
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
    setCurrentPage(pageNum);
  }

  return {
    pageNumber,
    pagePost,
    currentPage,
    handlePagination,
  };
}

export default PostFunction;
