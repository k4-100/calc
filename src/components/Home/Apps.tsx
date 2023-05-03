import React from "react";
import { Paper, Box } from "@mui/material";
import { Calculate, Note, Slideshow } from "@mui/icons-material";

import AppsButton from "./AppsButton";
import { useSelector } from "react-redux";

/**
 * @returns additional links to different apps in form of buttons with icons
 * */
const Apps: React.FC = () => {
    const { profile } = useSelector((state: any) => state);

    return (
        <Paper
            elevation={2}
            sx={{
                mt: 3,
                mx: "24px",
                p: 2,
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    height: {
                        sm: "initial",
                        xs: "550px",
                    },
                    flexDirection: {
                        sm: "row",
                        xs: "column",
                    },
                    justifyContent: {
                        md: "flex-start",
                        sm: "center",
                        xs: "space-between",
                    },
                    alignItems: {
                        sm: "initial",
                        xs: "center",
                    },
                    "& > *": {
                        mr: {
                            sm: 2,
                            xs: "inherit",
                        },
                    },
                }}
            >
                <AppsButton
                    icon={<Calculate />}
                    link={`/calc/${profile.index}`}
                    text="Calc (Sheet)"
                />
                <AppsButton
                    background="success.dark"
                    icon={<Note />}
                    link={`/text/${profile.index}`}
                    text="Text (in progress)"
                />
                <AppsButton
                    disabled
                    icon={<Slideshow />}
                    text="Present (in progress)"
                />
            </Box>
        </Paper>
    );
};

export default Apps;
