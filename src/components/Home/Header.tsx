import React, { useState } from "react";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import BorderStyleIcon from "@mui/icons-material/BorderStyle";
import { Link as RouterLink } from "react-router-dom";
import { Looks3, LooksOne, LooksTwo } from "@mui/icons-material";
import Profile from "./Profile";
import { grey } from "@mui/material/colors";
import { useSelector } from "react-redux";

const headerHeight: number = 60;
/**
 * @returns Basic Header with links used inside Home component
 */
const Header: React.FC = () => {
    const { profile } = useSelector((state: any) => state);

    const [isProfileVisible, setIsProfileVisible] = useState<boolean>(false);

    const showCurrentNumber = () => {
        switch (profile.index) {
            case 3:
                return <Looks3 color="info" className="profile-index" />;
            case 2:
                return <LooksTwo color="info" className="profile-index" />;
            default:
                return <LooksOne color="info" className="profile-index" />;
        }
    };

    return (
        <Box
            sx={{
                position: "relative",
                flexGrow: 1,
                height: `${headerHeight}px`,
            }}
        >
            <AppBar sx={{ position: "static" }}>
                <Toolbar
                    sx={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexWrap: {
                            sm: "nowrap",
                            xs: "wrap",
                        },
                    }}
                >
                    <Button
                        component={RouterLink}
                        to="/"
                        sx={{
                            mr: "auto",
                            display: "flex",
                            justifyContent: { sm: "initial", xs: "flex-start" },
                            alignItems: "center",
                            width: { sm: "initial", xs: "100%" },
                        }}
                    >
                        <BorderStyleIcon
                            sx={{
                                mr: 1,
                                // mt: 1,
                            }}
                        />
                        {/* <Box> */}
                        <Typography
                            variant="h5"
                            component="div"
                            sx={{
                                height: "25px",
                                lineHeight: "initial",
                            }}
                        >
                            Sheet
                        </Typography>
                        {/* </Box> */}
                    </Button>
                    <Box>
                        <Button component={RouterLink} to="/">
                            Home
                        </Button>
                        <Button
                            component={RouterLink}
                            to={`/calc/${profile.index}`}
                        >
                            Calc
                        </Button>
                        <Button
                            component={RouterLink}
                            to={`/text/${profile.index}`}
                        >
                            Mark
                        </Button>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            backgroundColor: isProfileVisible
                                ? `${grey[900]}`
                                : "initial",
                            height: `${headerHeight + 3}px`,
                        }}
                    >
                        <Button
                            color="info"
                            sx={{
                                backgroundColor: isProfileVisible
                                    ? `${grey[900]}`
                                    : "initial",
                                borderRadius: 0,
                                height: "80%",
                            }}
                            onClick={() =>
                                setIsProfileVisible(!isProfileVisible)
                            }
                        >
                            {showCurrentNumber()}
                            {/* <LooksOne /> */}
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
            {isProfileVisible && (
                <Profile showCurrentNumber={showCurrentNumber} />
            )}
        </Box>
    );
};

export default Header;
