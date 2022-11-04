import React, { useState } from "react";
import { Button, FormControl, Paper, TextField } from "@mui/material";
import _ from "lodash";
import ProfileAccessed from "./ProfileAccessed";

const Profile = () => {
  const [login, setLogin] = useState("");
  const [pass, setPass] = useState("");
  const [profileAccessed, setProfileAccessed] = useState(false);
  const [profileData, setProfileData] = useState<null | Object>(null);
  const handleLogIn = async () => {
    const userData = await fetch(
      `http://127.0.0.1:5000/login?username=${login}&pass=${pass}`
    )
      .then((response) => response.json())
      .catch((err) => console.log("error on handleLogIn: ", err));
    const { data, status } = userData;
    if (status && !_.isEmpty(data)) {
      setProfileAccessed(true);
      setProfileData(data);
    }
  };

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
        {profileAccessed ? (
          <ProfileAccessed
            profileData={profileData}
            handleLogOutClick={() => setProfileAccessed(false)}
          />
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
            <Button variant="contained" color="success" onClick={handleLogIn}>
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
