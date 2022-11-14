import React, { useState } from "react";
import { Button, AppBar } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { ArrowBackIosNew, HelpCenter, Save } from "@mui/icons-material";
import _ from "lodash";

import SearchBar from "./SearchBar";
import Help from "./Help";
import { useGlobalContext } from "../../../context";

/**
 *
 * @returns Belt with Utilities
 */
const UtilityBelt: React.FC = () => {
  const [displayHelp, setDisplayHelp] = useState(false);
  const { sheet, userID } = useGlobalContext();

  function handleSave() {
    if (userID) {
      if (sheet.id === 0)
        fetch("http://127.0.0.1:5000/table", {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          //make sure to serialize your JSON body
          body: JSON.stringify({
            content: [sheet.tables.map((table) => table.convertToJSON())],
            sheetID: sheet.id,
          }),
        })
          .then((response) => {
            //do something awesome that makes the world a better place
          })
          .catch((err) => console.log(err))
          .finally(() => console.log("perfomed save attempt"));
    }
  }
  return (
    <>
      <AppBar
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          height: "64px",
          zIndex: 100,
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
          color="success"
          sx={{
            width: "50px",
            ml: "auto",
          }}
          onClick={handleSave}
        >
          <Save
            sx={{
              fontSize: "40px",
            }}
          />
        </Button>
        <Button
          sx={{
            width: "50px",
            ml: 0,
          }}
          onClick={() => setDisplayHelp(!displayHelp)}
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
