import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./dist/css/compiled/main.css";
import Sheet from "./components";

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>
        <Sheet />
      </h1>
    </div>
  );
};

export default App;
