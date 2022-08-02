import * as React from "react";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import BorderStyleIcon from "@mui/icons-material/BorderStyle";
import { Link as RouterLink } from "react-router-dom";

const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{ position: "static" }}>
        <Toolbar>
          <Button
            component={RouterLink}
            to="/"
            sx={{
              mr: "auto",
              display: "flex",
            }}
          >
            <BorderStyleIcon
              sx={{
                mr: 1,
              }}
            />
            <Typography variant="h5">Sheet</Typography>
          </Button>
          <Button component={RouterLink} to="/">
            Home
          </Button>
          <Button component={RouterLink} to="/calc">
            Calc
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
