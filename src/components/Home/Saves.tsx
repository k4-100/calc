import React from "react";
import { Paper, Box, Typography } from "@mui/material";

import Save from "./Save";
import { Calculate } from "@mui/icons-material";
/**
 *
 * @returns component with multiple save "files"
 */
const Saves: React.FC = () => {
  return (
    <Paper

      sx={{
        mx: 3,
        backgroundColor: "primary.main"
      }}
    >
      <Box
        sx={{
          p: 3,
          pb: 0,
          display: "flex",
          alignItems: "center"
        }}
      >
        <Calculate sx={{
          fontSize: "40px",
          mr: 1.5,
        }}/>
        <Typography variant="h3" sx={{ 
          fontSize: "40px",
          alignSelf: "flex-start"
        }}>
          Calc
        </Typography>   
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          p: 2,
        }}
      >
        <Save />
        <Save />
        <Save />
      </Box>
    </Paper>
  );
};

export default Saves;
