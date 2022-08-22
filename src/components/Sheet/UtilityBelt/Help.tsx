import React from "react";
import { Box, IconButton, List, ListItem, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Cancel } from "@mui/icons-material";

interface Props {
  handleXClick: () => void;
}

const Help = ({ handleXClick }: Props) => {
  return (
    <Box
      sx={{
        backgroundColor: "hsla(0,0%,10%,0.7)",
        zIndex: 1000,
        position: "fixed",
        top: 0,
        width: "100%",
        height: "100%",
      }}
    >
      <Box
        sx={{
          height: "75%",
          mt: 10,
          mx: 15,
          backgroundColor: grey[900],
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            p: 2,
            py: 3,
          }}
        >
          <Typography variant="h4">How to Guide:</Typography>
          <IconButton onClick={handleXClick}>
            <Cancel fontSize="large" color="error" />
          </IconButton>
        </Box>
        <List
          sx={{
            mx: 3,
            backgroundColor: "white",
            color: grey[800],
            borderRadius: "10px",
            "& > *": {
              display: "flex",
              // alignItems: "center",
              border: `1px solid ${grey[200]}`,
              height: "75px",
              fontSize: "19px",
            },
            "& > *:first-of-type": {
              borderTop: "0",
            },
            "& > *:last-of-type": {
              borderBottom: "0",
            },
          }}
        >
          <ListItem>
            To change text, click twice on a cell and start typing, and save by
            clicking Enter/clicking somewhere else.
          </ListItem>
          <ListItem>
            To perform calculation, begin by typing `=`, for example: =10-5
          </ListItem>
          <ListItem>
            You can access cell for use in mathematical expression by its "name"
            (for example: A1, B3, C2), by typing `=` before it (like: =A2, =B3).
          </ListItem>
          <ListItem>
            Exit this menu by pressing X in a top-right corner.{" "}
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default Help;
