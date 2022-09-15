import React from "react";
import { Paper } from "@mui/material";

import Save from "./Save";
/**
 *
 * @returns component with multiple save "files"
 */
const Saves: React.FC = () => {
  return (
    <Paper
      elevation={10}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        mt: 3,
        p: 2,
        mx: 3,
      }}
    >
      <Save />
      <Save />
      <Save />
    </Paper>
  );
};

export default Saves;
