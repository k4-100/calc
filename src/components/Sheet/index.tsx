import { Box } from "@mui/material";
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
      <Box
        sx={{
          overflow: "scroll",
          // firefox
          scrollbarColor: "rgb(144, 202, 249) black",
          // webkit (chrome, edge, opera, safari but not on ios)
          // "&::-webkit-scrollbar": {
          //   // backgroundColor: "rgb(144, 202, 249)",
          // },
          height: "calc( 100vh - 53px - 64px - 20px )",
        }}
      >
        <Suspense fallback={<h1>Loading Table...</h1>}>
          <SuspensendedCustomTable />
        </Suspense>
      </Box>
      <SheetBar />
    </>
  );
};

export default Sheet;
