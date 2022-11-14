import React from "react";
import _ from "lodash";
import { useGlobalContext } from "../../context";
import { Box, Button } from "@mui/material";

/**
 *
 * @returns SheetBarButton Button in a SheetBar
 */
const SheetBarButton: React.FC<{ name: string; id: number }> = ({
  name,
  id,
}) => {
  const { sheet, setSheet } = useGlobalContext();

  /**
   * deletes table from sheet
   * @param id id of table to be deleted
   */
  const handleDelClick = (id: number) => {
    const _sheet = _.cloneDeep(sheet);
    const deleteIndex = _sheet.tables.findIndex((tab) => tab.id === id);
    _sheet.tables.splice(deleteIndex, 1);
    // ensures there will be always a main tab
    if (_sheet.mainTabIndex === id) _sheet.mainTabIndex = _sheet.tables[0].id;
    setSheet!(_sheet);
  };
  /**
   * switches to another main table
   * @param id id of a new main table
   */
  const handleSwitchToNextTable = (id: number) => {
    const _sheet = _.cloneDeep(sheet);
    _sheet.mainTabIndex = id;
    setSheet!(_sheet);
  };

  return (
    <Box
      sx={{
        display: "flex",
        mr: 4,
      }}
    >
      <Button
        variant="contained"
        onClick={() => handleSwitchToNextTable(id)}
        sx={{
          borderRadius: 0,
        }}
      >
        {name}
      </Button>
      <Button
        variant="contained"
        color="error"
        onClick={() => handleDelClick(id)}
        sx={{
          borderRadius: 0,
        }}
        disabled={sheet.tables.length < 2}
      >
        X
      </Button>
    </Box>
  );
};

export default SheetBarButton;
