import { Routes, Route } from "react-router-dom";
import Add from "./pages/Add";
import Books from "./pages/Books";
import Update from "./pages/Update";
import Page404 from "./pages/Page404";

function App() {
  return (
    <div className="pt-8 px-24 flex items-center justify-center text-center">
      <Routes>
        <Route path="/" exact element={<Books />} />
        <Route path="/add" exact element={<Add />} />
        <Route path="/update/:id" exact element={<Update />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default App;
