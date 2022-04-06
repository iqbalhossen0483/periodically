import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import usePost from "../../hooks/usePost";
import "./json.css";

const Json = () => {
  const [jsonData, setJsonData] = useState<string | null>(null);
  const { query } = useParams();
  const objectId = query?.split("&&")[0];
  const post = usePost();

  useEffect(() => {
    let data: Post | undefined;
    data = post?.pagePost?.find((item) => item.objectID === objectId);
    setJsonData(JSON.stringify(data, undefined, 2));
  }, [post, objectId]);

  return (
    <div data-testid="json-page" className="w-screen p-5">
      {jsonData && <pre>{jsonData}</pre>}
    </div>
  );
};

export default Json;
