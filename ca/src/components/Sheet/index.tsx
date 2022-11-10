import React, { Suspense, useEffect } from "react";
import { Box } from "@mui/material";
import _ from "lodash";
import { useGlobalContext } from "../../context";
import SheetBar from "./SheetBar";
import UtilityBelt from "./UtilityBelt";

const SuspensendedCustomTable = React.lazy(() => import("./CustomTable"));
/**
 *
 * @returns Sheet component
 */
const Sheet: React.FC = () => {
  const { sheet, setSheet } = useGlobalContext();

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/table/${1}`)
      .then(async (fetched) => await fetched.json())
      .then((json) => {
        const { tableID, content } = json.data;
        const newSheet = _.cloneDeep(sheet);
        console.log(tableID, content);
        newSheet.loadTableFromJSON(tableID, content);
        setSheet!(newSheet);
      })
      .catch((err) => console.log(err));
  }, []);

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
