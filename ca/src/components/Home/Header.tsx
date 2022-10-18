import React, { useState } from "react";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import BorderStyleIcon from "@mui/icons-material/BorderStyle";
import { Link as RouterLink } from "react-router-dom";
import { AccountCircle } from "@mui/icons-material";
import Profile from "./Profile";

const Header = () => {
  const [profileClicked, setProfileClicked] = useState<boolean>(false);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{ position: "static" }}>
        <Toolbar
          sx={{
            flexDirection: {
              sm: "row",
              xs: "column",
            },
            alignItems: {
              sm: "center",
              xs: "flex-start",
            },
          }}
        >
          <Button
            component={RouterLink}
            to="/"
            sx={{
              mr: "auto",
              display: "flex",
              alignItems: "center",
            }}
          >
            <BorderStyleIcon
              sx={{
                mr: 1,
              }}
            />
            <Typography
              variant="h5"
              component="div"
              sx={{
                height: "25px",
              }}
            >
              Sheet
            </Typography>
          </Button>
          <Box>
            <Button component={RouterLink} to="/">
              Home
            </Button>
            <Button component={RouterLink} to="/calc">
              Calc
            </Button>
          </Box>
          <Box>
            <Button onClick={() => setProfileClicked(!profileClicked)}>
              <AccountCircle />
            </Button>
            {profileClicked && <Profile />}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
