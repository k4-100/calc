import { Paper, Button } from "@mui/material";
import React from "react";
import { Facebook, Twitter, Instagram, WhatsApp } from "@mui/icons-material";

type Props = {
    text: string;
    background: string;
    hoverBackground: string;
    startIcon: any;
};

/**
 *
 * @param text text inside button
 * @param background color of the background
 * @param hoverBackground color of the background on hover/activation
 * @param startIcon icon at the start of the button from the left
 * @returns Custom button with social media link
 */
const CustomButton: React.FC<Props> = ({
    text,
    background,
    hoverBackground,
    startIcon,
}) => {
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
                "&:hover, &:active": {
                    backgroundColor: hoverBackground,
                },
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
                background="hsl(214, 89%, 52%)"
                hoverBackground="hsl(214, 89%, 47%)"
                startIcon={<Facebook />}
            />
            <CustomButton
                text="Twitter"
                background="hsl(203, 88%, 52%)"
                hoverBackground="hsl(203, 88%, 47%)"
                startIcon={<Twitter />}
            />
            <CustomButton
                text="Instagram"
                background="hsl(348, 70%, 50%)"
                hoverBackground="hsl(348, 70%, 45%)"
                startIcon={<Instagram />}
            />
            <CustomButton
                text="WhatsApp"
                background="hsl(173, 77%, 31%)"
                hoverBackground="hsl(173, 77%, 26%)"
                startIcon={<WhatsApp />}
            />
        </Paper>
    );
};

export default SocialMedia;
