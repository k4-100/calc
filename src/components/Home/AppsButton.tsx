import React from "react";
import { IconButton, Paper, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
type Props = {
    disabled?: boolean;
    icon: any;
    text: string;
    link?: string;
    background?: string;
};

/**
 * size of the AppsButton
 */
const SIZE = 170;

/**
 *
 * @param disabled is button inside disabled?
 * @param icon icon inside button
 * @param text text below button
 * @param link link to an app
 * @param background color of the background
 * @returns Fancy Button with a link to one of the apps
 */
const AppsButton: React.FC<Props> = ({
    disabled,
    icon,
    text,
    link,
    background,
}) => {
    return (
        <Paper
            elevation={20}
            sx={{
                p: 2.5,
                pb: 1,
                height: `${SIZE}px`,
                width: {
                    sm: `${SIZE}px`,
                    xs: "100%",
                },
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
            <IconButton
                component={RouterLink}
                to={String(link)}
                disabled={disabled}
                sx={{
                    width: "55px",
                    height: "55px",
                    boxSizing: " content-box",
                    color: "white",
                    borderRadius: 0,
                    backgroundColor: background || "primary.dark",
                    "& > svg": {
                        fontSize: "50px",
                    },
                }}
            >
                {icon}
            </IconButton>
            <Typography variant="h5" align="center">
                {text}
            </Typography>
        </Paper>
    );
};

export default AppsButton;
