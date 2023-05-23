import {
    Paper,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../store";
import { ProfileVariantEnum } from "../../utility/Classes";

const ModeSwitcher: React.FC = () => {
    const { mode } = useSelector((state: any) => state);
    const dispatch = useDispatch();

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string
    ) => {
        if (newAlignment !== null) {
            dispatch(
                actions.setMode(
                    newAlignment === "local"
                        ? ProfileVariantEnum.Local
                        : ProfileVariantEnum.Online
                )
            );
        }
    };

    return (
        <Paper
            sx={{
                pl: 1,
                mt: 2,
                mx: 3,
                mb: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
            }}
        >
            <Typography
                variant="h4"
                sx={{
                    pr: 1,
                    height: "100%",
                    borderRight: `${grey[700]} solid 1px`,
                }}
            >
                Current Mode
            </Typography>
            <ToggleButtonGroup
                color="primary"
                value={mode == ProfileVariantEnum.Local ? "local" : "online"}
                exclusive
                onChange={handleChange}
                aria-label="Platform"
            >
                <ToggleButton value="local">Local</ToggleButton>
                <ToggleButton value="online">Online</ToggleButton>
            </ToggleButtonGroup>
        </Paper>
    );
};

export default ModeSwitcher;
