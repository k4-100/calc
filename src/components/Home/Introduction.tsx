import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";

/**
 * @returns introduction to the page
 */
const Introduction: React.FC = () => {
    const [isTextToggled, setIsTextToggled] = useState(false);

    return (
        <Box
            sx={{
                backgroundImage: "url(https://picsum.photos/id/60/2000/1000)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: 1,
                pl: {
                    sm: 5,
                    xs: 2,
                },
                pr: 2,
                py: {
                    sm: 5,
                    xs: 1,
                },
                m: 3,
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
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Repellendus unde et dolorum asperiores recusandae vero aliquid
                nisi quo ipsam ullam?
            </Typography>
            {isTextToggled && (
                <Typography
                    sx={{
                        width: {
                            xs: "100%",
                            md: 1 / 2,
                        },
                        my: 2,
                        mb: 7,
                        fontSize: "clamp(12px, 3vw, 24px)",
                    }}
                >
                    Voluptatum minima modi nihil itaque quas eum dicta. Quae
                    saepe vero facilis aliquid quidem maiores laborum.
                    Perferendis, sunt neque impedit id maxime non illo
                    praesentium quisquam pariatur repellendus delectus unde
                    accusamus facere.
                </Typography>
            )}
            <Button
                color="info"
                variant="contained"
                onClick={() => setIsTextToggled(!isTextToggled)}
                sx={{
                    fontSize: {
                        xs: "10px",
                        md: "14px",
                    },
                }}
            >
                {isTextToggled ? "Show Less" : "Read more"}
            </Button>
        </Box>
    );
};

export default Introduction;
