import React from "react";
import { Box, Grid, Typography } from "@mui/material";

import Header from "./Header";
import SocialMedia from "./SocialMedia";
import Introduction from "./Introduction";
import AboutUs from "./AboutUs";
import Opinions from "./Opinions";
import Apps from "./Apps";
import Saves from "./Saves";
import AppsWithSaves from "./AppsWithSaves";
/**
 *
 * @returns Home page
 */
const Home: React.FC = () => {
  return (
    <>
      <Header />
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
        {/* <AppsWithSaves /> */}
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
    </>
  );
};

export default Home;
