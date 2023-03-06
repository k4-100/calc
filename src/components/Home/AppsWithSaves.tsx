import { Box } from '@mui/material';
import React from 'react';
import Saves from './Saves';


const AppsWithSaves: React.FC = () =>{
  return(
  <Box sx={{
      mt: "70px"
    }}>
      <Saves />
      {/* <Saves /> */}
      {/* <Saves /> */}
  </Box>
  );
}

export default AppsWithSaves;
