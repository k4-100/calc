import React from "react";
import SheetBar from "./SheetBar";
import CustomTable from "./CustomTable";
import UtilityBelt from "./UtilityBelt";

/**
 *
 * @returns Sheet component
 */
const Sheet: React.FC = () => {
  return (
    <>
      <UtilityBelt />
      <CustomTable />
      <SheetBar />
    </>
  );
};

export default Sheet;
