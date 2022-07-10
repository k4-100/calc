import React from "react";
import CustomTable from "./CustomTable";
import UtilityBelt from "./UtilityBelt";

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
