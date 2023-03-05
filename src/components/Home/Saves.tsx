import React from "react";
import { Paper, Box, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";

import Save from "./Save";
import { Calculate } from "@mui/icons-material";
/**
 *
 * @returns component with multiple save "files" for a given app
 */
const Saves: React.FC = () => {
  return (
    <Box
      sx={{
        mx: 3,
        backgroundColor: `${blue[900]}`,
        position: "relative" 
      }}
    >
      <Box
        sx={{
          p: 3,
          pb: 0,
        }}
      >
        <Box sx={{
          display: "flex",
          alignItems: "center"
        }}>
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
        <Box sx={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "40vw",
          height: "45px",
          backgroundColor: `${blue[700]}`,
          borderRadius: "0 4px 0 0",
          display: "flex",
          alignItems: "center",
          justifyContent:" space-between"
        }}>
          <Box sx={{
            width: 0,
            height: 0,
            borderRight: '35px solid transparent',
            borderBottom: `45px solid ${blue[900]}`,
            backgroundClip:  'padding-box'
          }}>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          p: 2
        }}
      >
        <Save />
        <Save />
        <Save />
      </Box>
    </Box>
  );
};

export default Saves;
