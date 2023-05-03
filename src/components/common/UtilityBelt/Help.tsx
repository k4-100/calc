import React from "react";
import { Box, IconButton, List, ListItem, Typography } from "@mui/material";
import { grey, red } from "@mui/material/colors";
import { Cancel } from "@mui/icons-material";

interface Props {
    handleXClick: () => void;
    children: React.ReactNode;
}

const Help = ({ handleXClick, children }: Props) => {
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
                            minHeight: "75px",
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
                    {children}
                    <ListItem>
                        Exit this menu by pressing{" "}
                        <Cancel
                            fontSize="large"
                            color="error"
                            sx={{
                                mx: 1,
                                backgroundColor: `${grey[800]}`,
                                color: `${red[500]}`,
                                fontSize: "35px",
                                borderRadius: "100%",
                            }}
                        />
                        in a top-right corner.
                    </ListItem>
                </List>
            </Box>
        </Box>
    );
};

export default Help;
