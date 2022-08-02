import * as React from "react";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";

const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar>
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            SHEET
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
