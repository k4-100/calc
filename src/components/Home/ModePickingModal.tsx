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
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../store";
import { ProfileVariantEnum } from "../../utility/Classes";
import { grey } from "@mui/material/colors";

type Props = {
    handleModalClose: Function;
};

const options = [
    {
        heading: "hover to check",
        description: [
            "click to choose",
            'you can change it later in "current mode"',
        ],
    },
    {
        heading: "Locally",
        // description: "Saves data in browser's local storage",
        description: [
            "Saves data in browser's local storage",
            "click at the number to switch to another sheet",
        ],
    },
    {
        heading: "Remotely",
        description: [
            "Saves data in a server account",
            "create or log into account to access wherever",
        ],
    },
];

const ModePickingModal: React.FC<Props> = ({ handleModalClose }) => {
    const [currentHoverIndex, setCurrentHoverIndex] = useState<number>(0);

    const { mode } = useSelector((state: any) => state);
    const dispatch = useDispatch();

    const handleClick = (variant: ProfileVariantEnum) => {
        dispatch(actions.setMode(variant));
        handleModalClose();
    };

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
                    onClick={() => handleClick(ProfileVariantEnum.Local)}
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
                    onClick={() => handleClick(ProfileVariantEnum.Online)}
                >
                    <StorageIcon />
                </IconButton>
            </Stack>
            <Box>
                <Typography variant="h4" align="center" fontWeight="bold">
                    {options[currentHoverIndex].heading}
                </Typography>

                <Typography variant="subtitle1" align="center">
                    {options[currentHoverIndex].description[0]}
                </Typography>
                <Typography
                    variant="subtitle2"
                    align="center"
                    color={grey[500]}
                >
                    {options[currentHoverIndex].description[1]}
                </Typography>
            </Box>
        </Dialog>
    );
};

export default ModePickingModal;
