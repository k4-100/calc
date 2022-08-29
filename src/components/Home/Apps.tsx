import React from "react";
import { Paper, Box } from "@mui/material";
import { Calculate, Note, Slideshow } from "@mui/icons-material";

import AppsButton from "./AppsButton";

const Apps: React.FC = () => {
  return (
    <Paper
      elevation={2}
      sx={{
        mt: 3,
        mx: "24px",
      }}
    >
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
        <AppsButton icon={<Calculate />} link="/calc" text="Calc (Sheet)" />
        <AppsButton disabled icon={<Note />} text="Word (in progress)" />
        <AppsButton
          disabled
          icon={<Slideshow />}
          text="Present (in progress)"
        />
      </Box>
    </Paper>
  );
};

export default Apps;
