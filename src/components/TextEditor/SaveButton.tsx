import { Save } from "@mui/icons-material";
import { Button } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import {
    MarkdownPanelObjectType,
    MarkdownPanelSheetObjectType,
} from "../../utility/Classes";
import { ROUTES } from "../../utility/constants";

const SaveButton: React.FC = () => {
    const { markdownPanelsRemote, token } = useSelector((state: any) => state);

    const saveSheetToDB = async () => {
        // console.log(JSON.stringify(calcRemote));
        const markdownPanelsRemotePrepared: MarkdownPanelSheetObjectType = {
            ...markdownPanelsRemote,
            panels: markdownPanelsRemote.panels.map(
                (panel: MarkdownPanelObjectType) => {
                    const newPanel: any = {
                        id: panel.id,
                        compressed_content: panel.content,
                    };
                    return newPanel;
                }
            ),
        };
        console.log(markdownPanelsRemotePrepared);
        await fetch(`${ROUTES.ROOT}/${ROUTES.MARKDOWN}/save`, {
            method: "PUT",
            // credentials: "include", // Needed to include the cookie
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token.accesstoken}`,
            },

            body: JSON.stringify(markdownPanelsRemotePrepared),
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
