import React from 'react';
import { ArrowLeft, ArrowRight, LooksOne } from '@mui/icons-material';
import { Box, IconButton, Typography, } from '@mui/material';
import { grey } from '@mui/material/colors';

const Profile = () =>{
  return(
    <Box sx={{
      zIndex: 1000,
      position: "absolute",
      top: "100%",
      right: "24px",
      width: "20vw",
      height: "200px",
      background: "red"
    }}>
      <Box sx={{
        backgroundColor: `${grey[900]}`,
        height: "100%"
      }}>
        <Typography variant="h5" fontWeight="bold" align="center" letterSpacing={4} sx={{
          py: "20px",
        }}>
          Profile:
        </Typography>
        <Box sx={{
          display: 'flex',
          justifyContent: "center",
          alignItems:"center",
          mt: 1,
        }}>
          <IconButton sx={{
            p: 0,
            borderRadius: 0
          }}>
           <ArrowLeft sx={{
              fontSize: "60px"
            }} />
          </IconButton>

          <LooksOne color="info" sx={{
            fontSize: "40px"
          }} />

          <IconButton sx={{
            p: 0,
            borderRadius: 0
          }}>
           <ArrowRight sx={{
              fontSize: "60px"
            }} />
          </IconButton>
        </Box>  
      </Box>
    </Box>
  )
};

export default Profile;
