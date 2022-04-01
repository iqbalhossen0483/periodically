import { useContext } from "react";
import { PostContext } from "../contex api/PostProvider";
const usePost = () => {
  return useContext(PostContext);
};

export default usePost;
