import React from "react";
import { Paper, Typography, Box } from "@mui/material";
import { Calculate, Note, Slideshow } from "@mui/icons-material";

import AppButton from "./AppButton";

const Apps: React.FC = () => {
  return (
    <Paper
      elevation={2}
      sx={{
        mt: 3,
        mx: "24px",
        pt: 2,
      }}
    >
      <Typography
        variant="h2"
        color="text.secondary"
        align="center"
        sx={{
          mb: 5,
          letterSpacing: 3,
          wordSpacing: 7,
        }}
      >
        Our Apps
      </Typography>
      <Box
        sx={{
          display: "flex",
          height: {
            sm: "initial",
            xs: "630px",
          },
          flexDirection: {
            sm: "row",
            xs: "column",
          },
          justifyContent: "space-between",
          alignItems: {
            sm: "initial",
            xs: "center",
          },
        }}
      >
        <AppButton icon={<Calculate />} link="/calc" text="Calc (Sheet)" />
        <AppButton disabled icon={<Note />} text="Word (in progress)" />
        <AppButton disabled icon={<Slideshow />} text="Present (in progress)" />
      </Box>
    </Paper>
  );
};

export default Apps;
