import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./json.css";

const Json = () => {
  const [jsonData, setJsonData] = useState<string | null>(null);
  const { query } = useParams();
  const objectId = query?.split("&&")[0];
  const pageNum = query?.split("&&")[1];

  useEffect(() => {
    (async () => {
      const url: string = `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${pageNum}`;
      const res = await fetch(url);
      const data: { hits: Post[] } = await res.json();

      const findTarget = data.hits.find((item) => item.objectID === objectId);
      if (findTarget) {
        setJsonData(JSON.stringify(findTarget));
      }
    })();
  }, [objectId, pageNum]);

  return (
    <div role='columnheader' className='break-words'>
      {jsonData && <p>{jsonData}</p>}
    </div>
  );
};

export default Json;
