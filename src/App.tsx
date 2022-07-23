import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./dist/css/compiled/main.css";
import Sheet from "./components/Sheet";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";

const App: React.FC = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="calc" element={<Sheet />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
