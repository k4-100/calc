import React from "react";
import { Divider, Typography } from "@mui/material";
/**
 *  @returns info section about "our" app
 * */
const AboutUs: React.FC = () => {
    return (
        <>
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
                Maiores magnam libero harum, praesentium saepe consectetur
                veniam suscipit! Aspernatur eligendi hic illo nostrum explicabo
                maxime nemo laborum repellendus architecto facere quae maiores
                amet quos quasi minus blanditiis, delectus ea vero dolores quam
                in, sequi placeat optio! Possimus eaque cupiditate eos
                voluptates vel corrupti ab, iste porro expedita quo nisi.
            </Typography>
            <Typography variant="h6" gutterBottom>
                Impedit atque tempora error non harum consectetur, asperiores
                quos. Id, reprehenderit ad dicta molestias animi autem excepturi
                modi veritatis. Reprehenderit ipsa excepturi perspiciatis itaque
                doloribus repellat voluptas perferendis, accusantium iusto
                saepe?
            </Typography>
            <Typography variant="h6" gutterBottom>
                Quibusdam est asperiores quod atque soluta suscipit, id amet
                praesentium repellat sed hic autem tenetur doloribus in? Ipsam,
                accusantium? Eveniet dolorum saepe at veniam dolor!
            </Typography>
            <Typography variant="h6" gutterBottom>
                Quis id est veritatis! Praesentium ea voluptas nulla laboriosam
                minus doloribus reiciendis amet animi hic aliquid, labore
                debitis vero quaerat minima dolorum dolore dignissimos?
            </Typography>
        </>
    );
};

export default AboutUs;
