import React, { useState } from "react";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import BorderStyleIcon from "@mui/icons-material/BorderStyle";
import { Link as RouterLink } from "react-router-dom";
import { LooksOne } from "@mui/icons-material";
import Profile from "./Profile";
import { grey } from "@mui/material/colors";

const headerHeight: number = 60


const Header = () => {
  const [isProfileVisible, setIsProfileVisible] = useState<boolean>(false);
  return (
    <Box sx={{ 
      position: "relative",
      flexGrow: 1,
      height: `${headerHeight}px`
    }}>
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
          <Box sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: isProfileVisible ? `${grey[900]}` : 'initial',
            mt: 1,
            height: `${headerHeight - 10}px`,
          }}>
            <Button color="info" sx={{
              backgroundColor: isProfileVisible ? `${grey[900]}` : 'initial',
              borderRadius: 0,
              height: "80%"
            }} 
            onClick={ 
              ()=> setIsProfileVisible(!isProfileVisible)
            }>
              <LooksOne />
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      {
        isProfileVisible && <Profile />
      }
    </Box>
  );
};

export default Header;
