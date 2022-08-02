import { Box, Button, Typography } from "@mui/material";
import React from "react";
import Header from "./Header";
import { grey } from "@mui/material/colors";
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
      <div className="bg-dark py-1 w-25 mr-3 mt-3"></div>
    </>
  );
};

export default Home;
