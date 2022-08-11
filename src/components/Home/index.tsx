import React from "react";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { Navigation, Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import Header from "./Header";
import { AccountCircle } from "@mui/icons-material";

const SliderCard: React.FC = () => {
  return (
    <Card>
      <CardActionArea>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            "& > *": {
              flex: 1,
            },
          }}
        >
          <Box
            sx={{
              height: "25px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <AccountCircle />
            <Typography>John White</Typography>
          </Box>
          <Typography
            variant="body1"
            sx={{
              my: 1,
            }}
          >
            Ciq ipsum dolor sit amet, consectetur adipisicing elit. Quidem odit
            perspiciatis nesciunt doloremque cumque.!
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            CEO at Company.com
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

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
          backgroundSize: "100%",
          backgroundPosition: "center",
          pl: 5,
          py: 5,
          mt: 3,
          mx: 3,
          minHeight: "250px",
        }}
      >
        <Typography variant="h3">Welcome to SHEET!</Typography>
        <Typography
          variant="h5"
          sx={{
            width: 1 / 2,
            my: 2,
          }}
        >
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus
          unde et dolorum asperiores recusandae vero aliquid nisi quo ipsam
          ullam?
        </Typography>
        <Button>Read more</Button>
      </Box>
      <Grid
        container
        columns={{ xs: 12 }}
        sx={{
          mt: 3,
          px: 3,
        }}
      >
        <Grid
          item
          xs={8}
          sx={{
            pr: 5,
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
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui
            molestias voluptates dolorum commodi consequuntur, doloremque
            aperiam. Quisquam architecto dolorum velit.
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
        <Grid item xs={4}>
          <Paper
            elevation={20}
            sx={{
              flexGrow: 1,
              height: "200px",
              "& *": {
                // background: "red",
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
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
