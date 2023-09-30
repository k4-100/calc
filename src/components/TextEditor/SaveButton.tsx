import { Save } from "@mui/icons-material";
import { Button } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { ROUTES } from "../../utility/constants";

const SaveButton: React.FC = () => {
    const { calcRemote, token } = useSelector((state: any) => state);

    const saveSheetToDB = async () => {
        console.log(JSON.stringify(calcRemote));
        await fetch(`${ROUTES.ROOT}/${ROUTES.MARKDOWN}/save`, {
            method: "PUT",
            // credentials: "include", // Needed to include the cookie
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token.accesstoken}`,
            },

            // body: JSON.stringify(JSON.parse(JSON.stringify(calcRemote))),
            body: JSON.stringify(calcRemote),
        })
            .then(async (data) => console.log(await data.json()))
            .catch((err) => console.log("error while saving sheet: ", err));
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
