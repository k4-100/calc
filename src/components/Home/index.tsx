import React from "react";
import { Box, Button, Divider, Grid, Paper, Typography } from "@mui/material";
import { Calculate, Note, Slideshow } from "@mui/icons-material";
import { Navigation, Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import Header from "./Header";
import SliderCard from "./SliderCard";
import SocialMedia from "./SocialMedia";
import AppButton from "./AppButton";

/**
 *
 * @returns Home page
 */
const Home: React.FC = () => {
  return (
    <>
      <Header />
      <Box
        sx={{
          backgroundImage: "url(https://picsum.photos/id/60/2000/1000)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          pl: {
            sm: 5,
            xs: 2,
          },
          py: {
            sm: 5,
            xs: 1,
          },
          mt: 3,
          mx: {
            sm: 3,
            xs: 0,
          },
          // minHeight: "285px",
        }}
      >
        <Typography
          sx={{
            fontSize: "clamp(20px, 5vw, 48px)",
          }}
        >
          Welcome to SHEET!
        </Typography>
        <Typography
          sx={{
            width: {
              xs: "100%",
              md: 1 / 2,
            },
            my: 2,
            fontSize: "clamp(12px, 3vw, 24px)",
          }}
        >
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus
          unde et dolorum asperiores recusandae vero aliquid nisi quo ipsam
          ullam?
        </Typography>
        <Button
          color="info"
          variant="contained"
          sx={{
            fontSize: {
              xs: "10px",
              md: "14px",
            },
          }}
        >
          Read more
        </Button>
      </Box>
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
          <Divider
            sx={{
              mb: 2,
            }}
          />
          <Typography variant="h4" gutterBottom>
            {" "}
            Section Header
          </Typography>
          <Typography variant="h6" gutterBottom>
            Maiores magnam libero harum, praesentium saepe consectetur veniam
            suscipit! Aspernatur eligendi hic illo nostrum explicabo maxime nemo
            laborum repellendus architecto facere quae maiores amet quos quasi
            minus blanditiis, delectus ea vero dolores quam in, sequi placeat
            optio! Possimus eaque cupiditate eos voluptates vel corrupti ab,
            iste porro expedita quo nisi.
          </Typography>
          <Typography variant="h6" gutterBottom>
            Impedit atque tempora error non harum consectetur, asperiores quos.
            Id, reprehenderit ad dicta molestias animi autem excepturi modi
            veritatis. Reprehenderit ipsa excepturi perspiciatis itaque
            doloribus repellat voluptas perferendis, accusantium iusto saepe?
          </Typography>
          <Typography variant="h6" gutterBottom>
            Quibusdam est asperiores quod atque soluta suscipit, id amet
            praesentium repellat sed hic autem tenetur doloribus in? Ipsam,
            accusantium? Eveniet dolorum saepe at veniam dolor!
          </Typography>
          <Typography variant="h6" gutterBottom>
            Quis id est veritatis! Praesentium ea voluptas nulla laboriosam
            minus doloribus reiciendis amet animi hic aliquid, labore debitis
            vero quaerat minima dolorum dolore dignissimos?
          </Typography>
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
            <Paper
              elevation={20}
              sx={{
                flexGrow: 1,
                height: "200px",
                "& *": {
                  height: "200px",
                },
              }}
            >
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={50}
                loop
                autoplay={{
                  delay: 5000,
                }}
              >
                <SwiperSlide>
                  <SliderCard />
                </SwiperSlide>
                <SwiperSlide>
                  <SliderCard />
                </SwiperSlide>
                <SwiperSlide>
                  <SliderCard />
                </SwiperSlide>
              </Swiper>
            </Paper>
            <SocialMedia />
          </Box>
        </Grid>
      </Grid>
      <Paper
        elevation={2}
        sx={{
          mt: 3,
          mx: "24px",
          pt: 2,
        }}
      >
        <Typography
          variant="h2"
          color="text.secondary"
          align="center"
          sx={{
            mb: 5,
            letterSpacing: 3,
            wordSpacing: 7,
          }}
        >
          Our Apps
        </Typography>
        <Box
          sx={{
            display: "flex",
            height: {
              sm: "initial",
              xs: "630px",
            },
            flexDirection: {
              sm: "row",
              xs: "column",
            },
            justifyContent: "space-between",
            alignItems: {
              sm: "initial",
              xs: "center",
            },
          }}
        >
          <AppButton icon={<Calculate />} link="/calc" text="Calc (Sheet)" />
          <AppButton disabled icon={<Note />} text="Word (in progress)" />
          <AppButton
            disabled
            icon={<Slideshow />}
            text="Present (in progress)"
          />
        </Box>
      </Paper>
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
