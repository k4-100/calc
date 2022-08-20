import React, { useState } from "react";
import { Button, AppBar } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import SearchBar from "./SearchBar";
import Help from "./Help";
import { ArrowBackIosNew, HelpCenter } from "@mui/icons-material";

/**
 *
 * @returns Belt with Utilities
 */
const UtilityBelt: React.FC = () => {
  const [displayHelp, setDisplayHelp] = useState(false);

  return (
    <>
      <AppBar
        sx={{
          display: "flex",
          flexDirection: "row",
          height: "64px",
        }}
      >
        <Button
          component={RouterLink}
          to="/"
          sx={{
            mr: 1,
          }}
        >
          <ArrowBackIosNew
            sx={{
              fontSize: "40px",
            }}
          />
        </Button>
        <SearchBar />
        <Button
          sx={{
            width: "50px",
            ml: "auto",
          }}
          // onClick={() => setDisplayHelp(!displayHelp)}
        >
          <HelpCenter
            sx={{
              fontSize: "40px",
            }}
          />
        </Button>
      </AppBar>
      {displayHelp && <Help handleXClick={() => setDisplayHelp(false)} />}
    </>
  );
};

export default UtilityBelt;
