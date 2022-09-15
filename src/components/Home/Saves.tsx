import React from "react";
import { Paper } from "@mui/material";

import Save from "./Save";
/**
 *
 * @returns component with multiple save "files"
 */
const Saves: React.FC = () => {
  return (
    <Paper>
      <Save />
      <Save />
      <Save />
    </Paper>
  );
};

export default Saves;
