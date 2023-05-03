import React from "react";
import { Box } from "@mui/system";
import { Button, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

/**
 * @returns Component with link to a front page, displayed in case of an incorrect url
 */
const ErrorPage: React.FC = () => {
    return (
        <Box
            sx={{
                mt: 3,
            }}
        >
            <Typography variant="h4" sx={{ ml: 1.5 }}>
                ERROR: Wrong url
            </Typography>
            <Button component={RouterLink} to="/" sx={{ ml: 1 }} color="info">
                Return Home
            </Button>
        </Box>
    );
};

export default ErrorPage;
