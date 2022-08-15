import { Paper, Button } from "@mui/material";
import React from "react";
import { Facebook, Twitter, Instagram, WhatsApp } from "@mui/icons-material";
import { styled } from "@mui/system";

type Props = {
  text: string;
  background: string;
  startIcon: any;
};

const CustomButton: React.FC<Props> = ({ text, background, startIcon }) => {
  return (
    <Button
      href="https://www.facebook.com/"
      variant="contained"
      startIcon={startIcon}
      sx={{
        background,
        color: "white",
        display: "flex",
        justifyContent: "flex-start",
        fontSize: "22px",
      }}
    >
      {text}
    </Button>
  );
};

/**
 *
 * @returns Social Media link buttons
 */
const SocialMedia = () => {
  return (
    <Paper
      elevation={10}
      sx={{
        height: "200px",
        mt: 3,
        display: "flex",
        flexDirection: "column",
        "& > *:not(:first-of-type)": {
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
        },
        "& > *:not(:last-of-type)": {
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        },
      }}
    >
      <CustomButton
        text="Facebook"
        background="#1877f2"
        startIcon={<Facebook />}
      />
      <CustomButton
        text="Twitter"
        background="#179cf0"
        startIcon={<Twitter />}
      />
      <CustomButton
        text="Instagram"
        background="#d8264b"
        startIcon={<Instagram />}
      />
      <CustomButton
        text="WhatsApp"
        background="#128c7e"
        startIcon={<WhatsApp />}
      />
    </Paper>
  );
};

export default SocialMedia;
