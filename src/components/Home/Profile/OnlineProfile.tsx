import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../../store";

const OnlineProfile: React.FC = () => {
    const { token } = useSelector((state: any) => state);
    const dispatch = useDispatch();

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
            console.log("accesstoken: ", result);
            const { id, username, accesstoken } = result;
            dispatch(
                actions.setAccessToken({
                    id,
                    username,
                    accesstoken,
                })
            );
        } else {
            console.log(result.error);
        }
    };

    const handleLogOut = () => {
        fetch("http://localhost:5000/logout", {
            method: "POST",
        })
            .then(async (data) => {
                const parsed = await data.json();
                dispatch(
                    actions.setAccessToken({
                        id: "",
                        username: "",
                        accesstoken: "",
                    })
                );
                setLogMessage(parsed.message);
                return parsed;
            })
            .catch((err) => {
                console.log("ERROR WHEN REGISTERING: ", err);
                setLogMessage(err);
            });
    };

    const handleRegister = async () => {
        await fetch("http://localhost:5000/register", {
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
            {!(token && token.accesstoken) ? (
                <>
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
                                handleChangeUsername(
                                    e as ChangeEvent<HTMLInputElement>
                                )
                            }
                            id="username"
                            label="username"
                            variant="outlined"
                        />
                        <TextField
                            onChange={(e) =>
                                handleChangePassword(
                                    e as ChangeEvent<HTMLInputElement>
                                )
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
                </>
            ) : (
                <Box
                    sx={{
                        px: 2,
                        py: 1,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        height: "150px",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <Typography> id: </Typography>
                        <Typography>{token && token.id}</Typography>
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <Typography>username: </Typography>
                        <Typography> {token && token.username} </Typography>
                    </Box>
                    <Button variant="outlined" onClick={handleLogOut}>
                        Log out
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default OnlineProfile;
