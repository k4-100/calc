import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";

const OnlineProfile: React.FC = () => {
    return (
        <Box>
            <Typography
                variant="h4"
                align="center"
                sx={{
                    pt: 1.5,
                }}
            >
                Account
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    p: 1,
                    "& > *": {
                        my: "5px",
                    },
                }}
            >
                <TextField id="username" label="username" variant="outlined" />
                <TextField
                    id="password"
                    label="password"
                    variant="outlined"
                    type="password"
                />
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <Button>log in</Button>
                    <Button>register</Button>
                </Box>
            </Box>
        </Box>
    );
};

export default OnlineProfile;
