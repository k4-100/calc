import React from "react";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import { Box, Button, Paper } from "@mui/material";
import { useGlobalContext } from "../../context";
import { TableClass } from "../../utility/Classes";
import SheetBarButton from "./SheetBarButton";

const SheetBar = () => {
  const { sheet, setSheet } = useGlobalContext();

  /**
   * adds new table into sheet
   */
  const handleTableAdd = () => {
    const _sheet = _.cloneDeep(sheet);
    _sheet.tables.push(new TableClass(3, 4, uuidv4()));
    setSheet!(_sheet);
  };

  return (
    <Paper
      elevation={2}
      sx={{
        display: "flex",
        position: "fixed",
        bottom: 0,
        p: 1,
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          overflowX: "scroll",
          pr: 5,
          boxSizing: "border-box",
          // ml: "auto",
        }}
      >
        {sheet.tables.length &&
          sheet.tables.map((tab, i) => (
            <SheetBarButton name={`${i + 1}`} id={tab.id} key={i} />
          ))}
      </Box>
      <Box
        sx={{
          ml: "auto",
          pl: 5,
        }}
      >
        <Button
          variant="outlined"
          color="success"
          onClick={() => handleTableAdd()}
          sx={{
            width: "20px",
          }}
        >
          +
        </Button>
      </Box>
    </Paper>
  );
};

export default SheetBar;
