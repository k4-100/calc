// type Props = {};
import React from "react";
import { Calculate } from "@mui/icons-material";
import { IconButton, Paper, Typography } from "@mui/material";

const AppButton = () => {
  return (
    <Paper
      elevation={20}
      sx={{
        p: 3,
        height: "190px",
        width: {
          sm: "190px",
          xs: "100%",
        },
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <IconButton
        // disabled
        sx={{
          width: "55px",
          height: "55px",
          boxSizing: " content-box",
          color: "white",
          borderRadius: 0,
          backgroundColor: "primary.dark",
          "& > svg": {
            fontSize: "50px",
          },
        }}
      >
        <Calculate />
      </IconButton>
      <Typography variant="h5">Calc (Sheet)</Typography>
    </Paper>
  );
};

export default AppButton;
