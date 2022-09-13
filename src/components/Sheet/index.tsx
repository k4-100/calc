import React, { Suspense } from "react";
import SheetBar from "./SheetBar";
// import CustomTable from "./CustomTable";
import UtilityBelt from "./UtilityBelt";

const SuspensendedCustomTable = React.lazy(() => import("./CustomTable"));
/**
 *
 * @returns Sheet component
 */
const Sheet: React.FC = () => {
  return (
    <>
      <UtilityBelt />
      <Suspense fallback={<h1>Loading Table...</h1>}>
        <SuspensendedCustomTable />
      </Suspense>
      <SheetBar />
    </>
  );
};

export default Sheet;
