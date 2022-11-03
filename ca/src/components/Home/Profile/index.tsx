import { Button, FormControl, Paper, TextField } from "@mui/material";
import React, { useState } from "react";
import ProfileAccessed from "./ProfileAccessed";

const Profile = () => {
  const [login, setLogin] = useState("");
  const [pass, setPass] = useState("");
  const [profileAccessed, setProfileAccessed] = useState(false);

  const handleLogIn = () => {};

  const handleRegister = () => {};
  return (
    <Paper
      elevation={5}
      sx={{
        position: "absolute",
        width: "261px",
        height: "201px",
        display: "flex",
        flexDirection: "column",
        padding: 1,
        top: "75px",
        right: "20px",
        "& > * > *:nth-of-type(1)": {
          mt: 0,
        },
        "& > * > *:nth-of-type(2)": {
          my: 1,
        },
      }}
    >
      <FormControl>
        {!profileAccessed ? (
          <ProfileAccessed />
        ) : (
          <>
            <TextField
              id="profile-login"
              label="Login"
              variant="outlined"
              size="small"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
            <TextField
              id="profile-login"
              label="Password"
              variant="outlined"
              size="small"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
            <Button variant="contained" color="success">
              Log in
            </Button>
            <Button>Register</Button>
          </>
        )}
      </FormControl>
    </Paper>
  );
};

export default Profile;
