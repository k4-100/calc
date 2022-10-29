import { AccountCircle } from "@mui/icons-material";
import { Box, Button, Paper, Typography } from "@mui/material";
import { blue, grey } from "@mui/material/colors";
import React from "react";

const ProfileAccessed = () => {
  return (
    <Box
      sx={{
        display: "flex",
        height: "180px",
        flexDirection: "column",
        justifyContent: "space-around",
        // alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <AccountCircle
          sx={{
            fontSize: "36px",
          }}
        />
        <Paper
          elevation={15}
          sx={{
            height: "30px",
            display: "flex",
            justifyContent: "center",
            width: 1,
            marginLeft: 2,
            backgroundColor: blue[800],
            fontSize: "20px",
            color: grey[900],
          }}
        >
          info
        </Paper>
      </Box>
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Paper
          elevation={100}
          sx={{
            marginRight: 1,
            paddingLeft: 1,
            paddingRight: 2,
          }}
        >
          user:
        </Paper>
        <Typography> xyz12345</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Paper
          elevation={100}
          sx={{
            marginRight: 1,
            paddingLeft: 1,
            paddingRight: 2,
          }}
        >
          created:
        </Paper>
        <Typography> 20.01.2021</Typography>
      </Box>
      <Button
        color="error"
        variant="outlined"
        sx={{
          width: 1,
        }}
      >
        Log out
      </Button>
    </Box>
  );
};

export default ProfileAccessed;
