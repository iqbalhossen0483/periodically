import { createContext, FC, ReactNode } from "react";
import { PostSchema } from "../hooks/PostFunction";

export const PostContext = createContext<PostSchema | null>(null);

interface Props {
  store: PostSchema;
  children: ReactNode;
}

const PostProvider: FC<Props> = ({ store, children }) => {
  return <PostContext.Provider value={store}>{children}</PostContext.Provider>;
};

export default PostProvider;
