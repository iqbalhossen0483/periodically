import { FC } from "react";
import "./json.css";

interface Props {
  data: Post;
  showJson: number;
  fn: (active: number) => void;
}

const Json: FC<Props> = ({ data, showJson, fn }) => {
  return (
    <div
      className={`json-container ${showJson && "show"}`}
      onClick={(e) => e.stopPropagation()}
    >
      <span onClick={() => fn(-1)} className='close'>
        &#x2715;
      </span>
      <p>{JSON.stringify(data)}</p>
    </div>
  );
};

export default Json;
