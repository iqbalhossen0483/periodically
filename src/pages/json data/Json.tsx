import { FC } from "react";

interface Props {
  data: Post;
  fn: (active: number) => void;
}

const Json: FC<Props> = ({ data, fn }) => {
  return (
    <div className='json-container' onClick={(e) => e.stopPropagation()}>
      <span onClick={() => fn(-1)} className='close'>
        &#x2715;
      </span>
      <p>{JSON.stringify(data)}</p>
    </div>
  );
};

export default Json;
