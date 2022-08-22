import React from "react";
import { IconButton, Paper, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
type Props = {
  disabled?: boolean;
  icon: any;
  text: string;
  link?: string;
};

/**
 *
 * @param disabled is button inside disabled?
 * @param icon icon inside button
 * @param text text below button
 * @param link link to an app
 * @returns
 */
const AppButton: React.FC<Props> = ({ disabled, icon, text, link }) => {
  return (
    <Paper
      elevation={20}
      sx={{
        p: 3,
        pb: 1,
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
        component={RouterLink}
        to={String(link)}
        disabled={disabled}
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
        {icon}
      </IconButton>
      <Typography variant="h5" align="center">
        {text}
      </Typography>
    </Paper>
  );
};

export default AppButton;
