import { Save } from "@mui/icons-material";
import { Button } from "@mui/material";
import React from "react";

const SaveButton: React.FC = () => {
    return (
        <>
            <Button>
                <Save
                    color="success"
                    sx={{
                        fontSize: "40px",
                    }}
                />
            </Button>
        </>
    );
};

export default SaveButton;
