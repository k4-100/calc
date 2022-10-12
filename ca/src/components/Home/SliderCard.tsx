import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Box,
} from "@mui/material";

import { AccountCircle } from "@mui/icons-material";

/**
 *
 * @returns card with customer's opinions inside of a slider
 */
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
            <AccountCircle
              sx={{
                height: "fit-content",
              }}
            />
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

export default SliderCard;
