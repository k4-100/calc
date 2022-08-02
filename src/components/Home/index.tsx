import { Box, Button, Divider, Grid, Paper, Typography } from "@mui/material";
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
      <Grid
        container
        columns={{ xs: 12 }}
        sx={{
          mt: 3,
          ml: 3,
        }}
      >
        <Grid item xs={8}>
          <Divider
            sx={{
              mb: 2,
              mr: 5,
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
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque
            explicabo harum delectus animi minima accusantium, veniam alias,
            impedit officiis aliquid similique quod, consectetur aspernatur
            numquam.
          </Typography>
          <Typography variant="h6" gutterBottom>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque,
            repudiandae mollitia? Quas sed reiciendis, eligendi laborum enim
            vitae sint nulla voluptatum, magni eaque exercitationem ut!
          </Typography>
          <Typography variant="h6" gutterBottom>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
            assumenda vel harum modi molestiae animi eligendi quam error,
            aspernatur deserunt eum officia debitis. Itaque, a?
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Paper
            sx={{
              flexGrow: 1,
            }}
          >
            text
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
