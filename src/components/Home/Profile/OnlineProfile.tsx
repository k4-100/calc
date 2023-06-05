import { Box, Button, TextField, Typography } from "@mui/material";
import React, { ChangeEvent, useState } from "react";

const OnlineProfile: React.FC = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

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
                        my: 0.5,
                    },
                }}
            >
                <TextField
                    value={username}
                    onChange={(e) =>
                        handleChangeUsername(e as ChangeEvent<HTMLInputElement>)
                    }
                    id="username"
                    label="username"
                    variant="outlined"
                />
                <TextField
                    onChange={(e) =>
                        handleChangePassword(e as ChangeEvent<HTMLInputElement>)
                    }
                    value={password}
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
