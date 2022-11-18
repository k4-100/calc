import React from "react";
import { Paper, Box, Typography } from "@mui/material";
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
        mx: 3,
      }}
    >
      <Typography
        variant="h3"
        sx={{
          p: 3,
          pb: 0,
        }}
      >
        Saved Files:
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          p: 2,
        }}
      >
        <Save />
      </Box>
    </Paper>
  );
};

export default Saves;
