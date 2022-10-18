import { Button, Paper, TextField } from "@mui/material";
import React from "react";

const Profile = () => {
  return (
    <Paper
      elevation={5}
      sx={{
        position: "absolute",
        display: "flex",
        flexDirection: "column",
        padding: 1,
        top: "75px",
        right: "20px",
        "& > *:nth-of-type(1)": {
          mt: 0,
        },
        "& > *:nth-of-type(2)": {
          my: 1,
        },
      }}
    >
      <TextField
        id="profile-login"
        label="Login"
        variant="outlined"
        size="small"
      />
      <TextField
        id="profile-login"
        label="Password"
        variant="outlined"
        size="small"
      />
      <Button variant="contained" color="success">
        Log in
      </Button>
      <Button>Register</Button>
    </Paper>
  );
};

export default Profile;
