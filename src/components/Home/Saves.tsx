import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { blue, green, orange } from "@mui/material/colors";

import Save from "./Save";
import { Calculate, Note, Slideshow } from "@mui/icons-material";

enum AppKind {
    Calc = "calc",
    Text = "text",
    Present = "present",
}

/**
 *
 * @returns component with multiple save "files" for a given app
 */
const Saves: React.FC = () => {
    const [currentApp, setCurrentApp] = useState<AppKind>(AppKind.Calc);

    const handleAppChange = (newApp: AppKind) => {
        setCurrentApp(newApp);
    };

    const currentBgColor = () => {
        if (currentApp === AppKind.Text) return `${green[800]}`;

        if (currentApp === AppKind.Present) return `${orange[900]}`;

        return `${blue[900]}`;
    };

    const currentIcon = () => {
        if (currentApp === AppKind.Text)
            return (
                <>
                    <Note />
                </>
            );

        if (currentApp === AppKind.Present)
            return (
                <>
                    <Slideshow />
                </>
            );

        return (
            <>
                <Calculate />
            </>
        );
    };

    return (
        <Box
            sx={{
                mt: "50px",
                mx: 3,
                // backgroundColor: `${blue[900]}`,
                backgroundColor: currentBgColor(),
                position: "relative",
            }}
        >
            <Box
                sx={{
                    p: 3,
                    pb: 0,
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        "& > svg": {
                            fontSize: "40px",
                            mr: 1.5,
                        },
                    }}
                >
                    {/* <Calculate sx={{ */}
                    {/*   fontSize: "40px", */}
                    {/*   mr: 1.5, */}
                    {/* }}/> */}
                    {currentIcon()}
                    <Typography
                        variant="h3"
                        sx={{
                            fontSize: "40px",
                            alignSelf: "flex-start",
                        }}
                    >
                        {currentApp}
                    </Typography>
                </Box>
                {/* crevice containg buttons for each app */}
                <Box
                    sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        width: "70vw",
                        height: "45px",
                        // backgroundColor: `${blue[900]}`,
                        backgroundColor: currentBgColor(),
                        borderRadius: "0 4px 0 0",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: " space-between",
                    }}
                >
                    <Button
                        onClick={() => handleAppChange(AppKind.Calc)}
                        color="primary"
                        sx={{
                            position: "relative",
                            left: "24%",
                            width: "100%",
                            height: "100%",
                            background: `${blue[700]}`,
                            clipPath:
                                "polygon(0 0, 65% 0, 100% 100%, 35% 100%)",
                            "&:hover": {
                                backgroundColor: `${blue[100]}`,
                            },
                        }}
                    >
                        <Calculate />
                    </Button>

                    <Button
                        onClick={() => handleAppChange(AppKind.Text)}
                        color="success"
                        sx={{
                            position: "relative",
                            left: "12%",
                            width: "100%",
                            height: "100%",
                            background: `${green[700]}`,
                            clipPath:
                                "polygon(0 0, 65% 0, 100% 100%, 35% 100%)",
                            "&:hover": {
                                backgroundColor: `${green[100]}`,
                            },
                        }}
                    >
                        <Note />
                    </Button>

                    <Button
                        onClick={() => handleAppChange(AppKind.Present)}
                        color="warning"
                        sx={{
                            width: "100%",
                            height: "100%",
                            backgroundColor: `${orange[700]}`,
                            clipPath:
                                "polygon(0 0, 100% 0, 100% 100%, 35% 100%)",
                            "&:hover": {
                                backgroundColor: `${orange[100]}`,
                            },
                        }}
                    >
                        <Slideshow
                            sx={{
                                mx: "auto",
                            }}
                        />
                    </Button>
                </Box>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    p: 2,
                    minHeight: "418px",
                }}
            >
                {currentApp === AppKind.Calc && (
                    <>
                        <Save />
                        <Save />
                        <Save />
                    </>
                )}
            </Box>
        </Box>
    );
};

export default Saves;
