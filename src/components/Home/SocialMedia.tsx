import { Paper, Button, Typography } from "@mui/material";
import React from "react";

/**
 *
 * @returns Social Media link buttons
 */
const SocialMedia = () => {
  return (
    <Paper
      elevation={10}
      sx={{
        height: "200px",
        mt: 3,
        display: "flex",
        flexDirection: "column",
        "& > *": {
          p: 1,
          fontSize: "20px",
          fontWeight: "bold",
        },
        "& > *:not(:first-child)": {
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
        },
        "& > *:not(:last-child)": {
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        },
      }}
    >
      <Button
        href="https://www.facebook.com/"
        variant="contained"
        disableElevation
      >
        Facebook
      </Button>
      <Button href="https://www.facebook.com/" variant="contained">
        Twitter
      </Button>
      <Button href="https://www.facebook.com/" variant="contained">
        Instagram
      </Button>
      <Button href="https://www.facebook.com/" variant="contained">
        Snapchat
      </Button>
    </Paper>
  );
};

export default SocialMedia;
