import React, { useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import Header from "./Header";
import SocialMedia from "./SocialMedia";
import Introduction from "./Introduction";
import AboutUs from "./AboutUs";
import Opinions from "./Opinions";
import Apps from "./Apps";
import Saves from "./Saves";
import ErrorPage from "./ErrorPage";
import ModeSwitcher from "./ModeSwitcher";
import ModePickingModal from "./ModePickingModal";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../store";

/**
 * @param isError determines if there was an error or not
 * @returns Home page, if isError === true returns ErrorPage instead
 */
const Home: React.FC<{ isError?: boolean }> = ({ isError }) => {
    const { miscellaneous } = useSelector((state: any) => state);
    const dispatch = useDispatch();

    const handleModalClose = () => dispatch(actions.setPickedMode(true));

    return (
        <>
            <Header />
            {isError ? (
                <ErrorPage />
            ) : (
                <>
                    <ModeSwitcher />
                    <Introduction />
                    <Apps />
                    <Grid
                        container
                        sx={{
                            mt: 3,
                            px: 3,
                        }}
                    >
                        <Grid
                            item
                            xs={12}
                            md={8}
                            sx={{
                                pr: {
                                    xs: 0,
                                    sm: 5,
                                },
                            }}
                        >
                            <AboutUs />
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            md={4}
                            sx={{
                                mt: {
                                    xs: 5,
                                    lg: 0,
                                },
                            }}
                        >
                            <Box>
                                <Opinions />
                                <SocialMedia />
                            </Box>
                        </Grid>
                    </Grid>
                    <Saves />
                    <Typography
                        variant="subtitle1"
                        align="center"
                        sx={{
                            my: 5,
                        }}
                    >
                        Copyright © XYZ 2022
                    </Typography>
                    {!miscellaneous.pickedMode && (
                        <ModePickingModal handleModalClose={handleModalClose} />
                    )}
                </>
            )}
        </>
    );
};

export default Home;
