import React from "react";
import { Paper, Box, Typography, Button } from "@mui/material";
import { blue, green, orange } from "@mui/material/colors";

import Save from "./Save";
import { Calculate, Note, Slideshow } from "@mui/icons-material";
/**
 *
 * @returns component with multiple save "files" for a given app
 */
const Saves: React.FC = () => {
  return (
    <Box
      sx={{
        mt: "50px",
        mx: 3,
        backgroundColor: `${blue[900]}`,
        position: "relative" 
      }}
    >
      <Box
        sx={{
          p: 3,
          pb: 0,
        }}
      >
        <Box sx={{
          display: "flex",
          alignItems: "center"
        }}>
          <Calculate sx={{
            fontSize: "40px",
            mr: 1.5,
          }}/>
          <Typography variant="h3" sx={{ 
            fontSize: "40px",
            alignSelf: "flex-start"
          }}>
            Calc
          </Typography>   
        </Box>
        {/* crevice containg buttons for each app */}
        <Box sx={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "70vw",
          height: "45px",
          backgroundColor: `${blue[900]}`,
          borderRadius: "0 4px 0 0",
          display: "flex",
          alignItems: "center",
          justifyContent:" space-between"
        }}>
          <Button 
            // color="primary"
            sx={{
            position: "relative",
            left: "24%",
            width: "100%",
            height: "100%",
            background: `${blue[700]}`,
            clipPath: 'polygon(0 0, 65% 0, 100% 100%, 35% 100%)',
            "&:hover": {
            backgroundColor: `${blue[300]}`,
            }
          }}>
            <Calculate />
          </Button> 
 
          <Button 
            color="success"
            sx={{
            position: "relative",
            left: "12%",
            width: "100%",
            height: "100%",
            background: `${green[700]}`,
            clipPath: 'polygon(0 0, 65% 0, 100% 100%, 35% 100%)',
            "&:hover": {
              backgroundColor: `${green[300]}`,
            }
          }}>
            <Note />
          </Button> 

          <Button 
            color="warning"
            sx={{
            width: "100%",
            height: "100%",
            backgroundColor: `${orange[800]}`,
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 35% 100%)',
            "&:hover": {
              backgroundColor: `${orange[600]}`,
            }
          }}>
            <Slideshow sx={{
              mx: "auto"
            }}/>
          </Button> 
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          p: 2
        }}
      >
        <Save />
        <Save />
        <Save />
      </Box>
    </Box>
  );
};

export default Saves;





{/* <Box sx={{ */}
{/*   backgroundColor: "red", */}
{/*   borderRight: '35px solid transparent', */}
{/*   borderBottom: `45px solid ${blue[900]}`, */}
{/*   backgroundClip:  'padding-box' */}
{/* }}> */}
{/* </Box> */}

