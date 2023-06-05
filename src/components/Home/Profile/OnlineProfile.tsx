import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import React, { ChangeEvent, useState } from "react";

const OnlineProfile: React.FC = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [logMessage, setLogMessage] = useState<string>("");

    const handleChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleLogIn = async () => {
        const result = await fetch("http://localhost:5000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
            }),
        })
            .then(async (data) => {
                const parsed = await data.json();
                setLogMessage(parsed.message);
                return parsed;
            })
            .catch((err) => {
                console.log("ERROR WHEN LOGGING: ", err);
                setLogMessage(err);
            });

        if (result.accesstoken) {
            console.log("accesstoken: ", result.accesstoken);
        } else {
            console.log(result.error);
        }
    };

    const handleRegister = async () => {
        const result = await fetch("http://localhost:5000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
            }),
        })
            .then(async (data) => {
                const parsed = await data.json();

                setLogMessage(parsed.message);
                return parsed;
            })
            .catch((err) => {
                console.log("ERROR WHEN REGISTERING: ", err);
                setLogMessage(err);
            });
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
                        my: "10px !important",
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
                    <Button onClick={handleLogIn}>log in</Button>
                    <Button onClick={handleRegister}>register</Button>
                </Box>
            </Box>
            <Paper
                elevation={20}
                sx={{
                    textAlign: "center",
                    p: 1,
                    minHeight: "40px !important",
                }}
            >
                {logMessage || "."}
            </Paper>
        </Box>
    );
};

export default OnlineProfile;
