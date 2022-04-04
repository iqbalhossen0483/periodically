import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Json from "./pages/json data/Json";

function App() {
  return (
    <div role="application">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/json/:query" element={<Json />} />
      </Routes>
    </div>
  );
}

export default App;
