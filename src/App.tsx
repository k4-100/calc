import React from "react";
import CustomTable from "./components/Sheet/CustomTable/index";
import "bootstrap/dist/css/bootstrap.min.css";
import "./dist/css/compiled/main.css";
import UtilityBelt from "./components/Sheet/UtilityBelt";

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>
        <UtilityBelt />
        <CustomTable />
      </h1>
    </div>
  );
};

export default App;
