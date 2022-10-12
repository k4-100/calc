import React from "react";
import { Paper } from "@mui/material";
import { Navigation, Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import SliderCard from "./SliderCard";

const Opinions: React.FC = () => {
  return (
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
  );
};

export default Opinions;
