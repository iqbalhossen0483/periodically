import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Json from "./pages/json data/Json";
import NotFound from "./pages/not found/NotFound";

function App() {
  return (
    <div role="application">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/json/:query" element={<Json />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
