import { Save } from "@mui/icons-material";
import { Button } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const SaveButton: React.FC = () => {
    const { mode, calcRemote, token } = useSelector((state: any) => state);

    const saveSheetToDB = () => {
        console.log(calcRemote);
    };

    return (
        <>
            <Button>
                <Save
                    color="success"
                    sx={{
                        fontSize: "40px",
                    }}
                    onClick={saveSheetToDB}
                />
            </Button>
        </>
    );
};

export default SaveButton;
