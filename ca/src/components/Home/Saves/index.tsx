import React, { useCallback, useEffect, useState } from "react";
import { Paper, Box, Typography } from "@mui/material";
import Save from "./Save";
import { useGlobalContext } from "../../../context";

/**
 *
 * @returns component with multiple save "files"
 */
const Saves: React.FC = () => {
  const [fetched, setFetched] = useState<any>();
  const { userData } = useGlobalContext();

  const fetchSheetList = useCallback(async () => {
    const { userID } = userData;
    fetch(`http://127.0.0.1:5000/sheet/?userid=${userID}`)
      .then(async (data) => setFetched(await data.json()))
      .catch((err) => console.log("failed to fetch sheet list:     ", err));
  }, [userData]);

  useEffect(() => {
    fetchSheetList();
  }, [fetchSheetList]);
  return (
    <Paper
      elevation={10}
      sx={{
        mx: 3,
      }}
    >
      <Typography
        variant="h3"
        sx={{
          p: 3,
          pb: 0,
        }}
      >
        Saved Files:
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          p: 2,
        }}
      >
        {fetched && fetched.data && fetched.data[0]
          ? fetched.data.map(
              (
                {
                  userID,
                  sheetID,
                  createTime,
                }: {
                  userID: number;
                  sheetID: number;
                  createTime: string;
                },
                index: number
              ) => (
                <Save
                  key={index}
                  userID={userID}
                  sheetID={sheetID}
                  date={createTime}
                />
              )
            )
          : ""}
      </Box>
    </Paper>
  );
};

export default Saves;
