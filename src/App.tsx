import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Json from "./pages/json data/Json";

function App() {
  return (
    <div role='application'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/json/:query' element={<Json />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
