import { createContext, FC, ReactNode } from "react";
import PostFunction, { PostSchema } from "../hooks/PostFunction";

export const PostContext = createContext<PostSchema | null>(null);

interface Props {
  children: ReactNode;
}

const PostProvider: FC<Props> = ({ children }) => {
  const post: PostSchema = PostFunction();

  return <PostContext.Provider value={post}>{children}</PostContext.Provider>;
};

export default PostProvider;
