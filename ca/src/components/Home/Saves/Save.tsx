import React from "react";
import { Paper, Box, Typography, Button } from "@mui/material";
import { PlayArrow } from "@mui/icons-material";
import { useGlobalContext } from "../../../context";

/**
 *
 * @returns a single "save file" with info
 */
const Save: React.FC<{ userID: number; sheetID: number; date: string }> = ({
  userID,
  sheetID,
  date,
}) => {
  const { sheet, setSheet } = useGlobalContext();

  const handleSheetLoad = () => {
    fetch(`http://127.0.0.1:5000/tables?sheetid=28`)
      .then(async (data) => console.log(await data.json()))
      .catch((err) => console.log("failed to fetch sheet list:     ", err));
  };

  return (
    <Paper
      sx={{
        display: "flex",
        justifyContent: "space-between",
        my: 1,
        pl: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          py: 1,
          flexDirection: "column",
          justifyContent: "center",
          "& > *": {
            my: 0.5,
          },
        }}
      >
        <Typography>sheetID: {sheetID}</Typography>
        <Typography>userID {userID}</Typography>
        <Typography>{date}</Typography>
      </Box>
      <Button
        sx={{
          ml: 1,
          // py: 2,
        }}
        onClick={handleSheetLoad}
      >
        <PlayArrow fontSize="large" />
      </Button>
    </Paper>
  );
};

export default Save;
