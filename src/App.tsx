import { Route, Routes } from "react-router-dom";
import PostProvider from "./contex api/PostProvider";
import PostFunction from "./hooks/PostFunction";
import Home from "./pages/home/Home";
import Json from "./pages/json data/Json";
import NotFound from "./pages/not found/NotFound";

function App() {
  const store = PostFunction();
  return (
    <PostProvider store={store}>
      <div role="application">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/json/:id" element={<Json />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
    </PostProvider>
  );
}

export default App;
