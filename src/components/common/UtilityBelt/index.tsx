import React, { ReactNode, useState } from "react";
import { Button, AppBar } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import Help from "./Help";
import { ArrowBackIosNew, HelpCenter } from "@mui/icons-material";

type Props = {
    children?: ReactNode;
    helpChildren?: ReactNode;
};

/**
 *
 * @returns Belt with Utilities
 */
const UtilityBelt: React.FC<Props> = ({ children, helpChildren }) => {
    const [displayHelp, setDisplayHelp] = useState(false);

    return (
        <>
            <AppBar
                sx={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "row",
                    height: "64px",
                    zIndex: 100,
                }}
            >
                <Button
                    component={RouterLink}
                    to="/"
                    sx={{
                        mr: 1,
                    }}
                >
                    <ArrowBackIosNew
                        sx={{
                            fontSize: "40px",
                        }}
                    />
                </Button>
                {children}

                {/* <SearchBar /> */}
                <Button
                    sx={{
                        width: "50px",
                        ml: "auto",
                    }}
                    onClick={() => setDisplayHelp(!displayHelp)}
                >
                    <HelpCenter
                        sx={{
                            fontSize: "40px",
                        }}
                    />
                </Button>
            </AppBar>
            {displayHelp && (
                <Help handleXClick={() => setDisplayHelp(false)}>
                    {helpChildren}
                </Help>
            )}
        </>
    );
};

export default UtilityBelt;
