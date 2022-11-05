import React, { useState } from "react";
import { Button, FormControl, Paper, TextField } from "@mui/material";
import _ from "lodash";
import ProfileAccessed from "./ProfileAccessed";

const Profile = () => {
  const [login, setLogin] = useState<string>("");
  const [pass, setPass] = useState<string>("");
  const [profileAccessed, setProfileAccessed] = useState<boolean>(false);
  const [profileData, setProfileData] = useState<null | Object>(null);
  const [errorMessage, setErrorMessage] = useState<string>(".");

  const handleLogIn = async () => {
    const fetchedData = await fetch(
      `http://127.0.0.1:5000/login?username=${login}&pass=${pass}`
    )
      .then((response) => response.json())
      .catch((err) => {
        console.log("error on handleLogIn: ", err);
      });
    const { data, status } = fetchedData;
    if (status && !_.isEmpty(data)) {
      setProfileAccessed(true);
      setProfileData(data);
      return;
    }

    setErrorMessage("Failed to log in");
  };

  const handleRegister = async () => {
    const fetchedData = await fetch(
      `http://127.0.0.1:5000/login?username=${login}&pass=${pass}`,
      {
        method: "POST",
      }
    )
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .catch((err) => {
        console.log("error on handleLogIn: ", err);
      });

    const { data, status } = fetchedData;
    if (status && !_.isEmpty(data)) {
      setProfileAccessed(true);
      setProfileData(data);
      return;
    }

    setErrorMessage("Failed to register");
  };

  return (
    <Paper
      elevation={5}
      sx={{
        position: "absolute",
        width: "261px",
        // height: "236px",
        display: "flex",
        flexDirection: "column",
        padding: 1,
        top: "75px",
        right: "20px",
        "& > * > *:nth-of-type(2)": {
          mt: 1,
        },
        "& > * > *:nth-of-type(3)": {
          my: 1,
        },
      }}
    >
      <FormControl>
        {profileAccessed ? (
          <ProfileAccessed
            profileData={profileData}
            handleLogOutClick={() => {
              setProfileAccessed(false);
              setProfileData(null);
              setErrorMessage(".");
            }}
          />
        ) : (
          <>
            <Paper
              elevation={20}
              sx={{
                p: 0.5,
                textAlign: "center",
                color: "red",
                textTransform: "uppercase",
              }}
            >
              {errorMessage}
            </Paper>
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
            <Button onClick={handleRegister}>Register</Button>
          </>
        )}
      </FormControl>
    </Paper>
  );
};

export default Profile;
