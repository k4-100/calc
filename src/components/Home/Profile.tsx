import React from "react";
import { ArrowLeft, ArrowRight, LooksOne } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../store";

const Profile: React.FC<{ showCurrentNumber: Function }> = ({
    showCurrentNumber,
}) => {
    const { profile } = useSelector((state: any) => state);
    const dispatch = useDispatch();

    const handleProfileChange = (difference: number) => {
        const delta: number = (profile.index + difference) % 3;
        dispatch(actions.setProfile(delta === 0 ? 3 : delta));
    };

    return (
        <Box
            sx={{
                zIndex: 1000,
                position: "absolute",
                // top: "",
                right: { sm: "24px", xs: "16px" },
                width: "250px",
                height: "200px",
                background: "red",
            }}
        >
            <Box
                sx={{
                    backgroundColor: `${grey[900]}`,
                    height: "100%",
                    width: "250px",
                }}
            >
                <Typography
                    variant="h5"
                    fontWeight="bold"
                    align="center"
                    letterSpacing={4}
                    sx={{
                        py: "20px",
                        width: "100%",
                    }}
                >
                    Profile:
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        mt: 1,
                        ".profile-index": {
                            fontSize: "40px",
                        },
                    }}
                >
                    <IconButton
                        onClick={() => handleProfileChange(-1)}
                        sx={{
                            p: 0,
                            borderRadius: 0,
                        }}
                    >
                        <ArrowLeft
                            sx={{
                                fontSize: "60px",
                            }}
                        />
                    </IconButton>

                    {showCurrentNumber()}
                    <IconButton
                        onClick={() => handleProfileChange(1)}
                        sx={{
                            p: 0,
                            borderRadius: 0,
                        }}
                    >
                        <ArrowRight
                            sx={{
                                fontSize: "60px",
                            }}
                        />
                    </IconButton>
                </Box>
            </Box>
        </Box>
    );
};

export default Profile;
