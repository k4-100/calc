import React from "react";
import CustomTable from "./Sheet/CustomTable";
import UtilityBelt from "./Sheet/UtilityBelt";

/**
 *
 * @returns Sheet component
 */
const Sheet: React.FC = () => {
  return (
    <main className="Sheet">
      <UtilityBelt />
      <CustomTable />
    </main>
  );
};

export default Sheet;
