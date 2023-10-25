import {
    Dialog,
    DialogTitle,
    Box,
    IconButton,
    Typography,
    Divider,
} from "@mui/material";
import React, { useState } from "react";
import {
    Storage as StorageIcon,
    DesktopWindowsOutlined,
} from "@mui/icons-material";
import { Stack } from "@mui/system";

type Props = {};

const options = [
    {
        heading: "hover to check",
        description: "click to choose",
    },
    {
        heading: "Locally",
        description: "Saves data in browser's local storage",
    },

    {
        heading: "Remotely",
        description: "Saves data in a server account",
    },
];

const ModePickingModal: React.FC<Props> = () => {
    const [currentHoverIndex, setCurrentHoverIndex] = useState<number>(0);
    return (
        <Dialog
            open={true}
            // fullScreen={true}
            sx={{
                background: "rgba(12, 59, 105,0.5)",
                "& > .MuiDialog-container > *": {
                    background: "rgba(28,28,28,0.85)",
                    p: "10px",
                },
            }}
        >
            <DialogTitle align="center" fontSize="30px">
                Where to save data?
            </DialogTitle>
            <Stack
                direction="row"
                gap="50px"
                sx={{
                    mb: "30px",
                    "& > *": {
                        p: "20px",
                        "& > svg": {
                            fontSize: "100px",
                        },
                    },
                }}
            >
                <IconButton
                    onMouseEnter={() => setCurrentHoverIndex(1)}
                    onMouseLeave={() => setCurrentHoverIndex(0)}
                >
                    <DesktopWindowsOutlined />
                </IconButton>
                <Divider
                    orientation="vertical"
                    flexItem
                    sx={{ p: "0 !important" }}
                />
                <IconButton
                    onMouseEnter={() => setCurrentHoverIndex(2)}
                    onMouseLeave={() => setCurrentHoverIndex(0)}
                >
                    <StorageIcon />
                </IconButton>
            </Stack>
            <Box>
                <Typography variant="h4" align="center" fontWeight="bold">
                    {options[currentHoverIndex].heading}
                </Typography>

                <Typography variant="subtitle1" align="center" gutterBottom>
                    {options[currentHoverIndex].description}
                </Typography>
            </Box>
        </Dialog>
    );
};

export default ModePickingModal;
