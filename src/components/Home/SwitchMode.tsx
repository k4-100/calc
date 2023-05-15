import {
    Paper,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { useState } from "react";

const ModeSwitcher: React.FC = () => {
    const [alignment, setAlignment] = useState<string>("local");
    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string
    ) => {
        if (newAlignment !== null) {
            setAlignment(newAlignment);
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
                value={alignment}
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
