import React  from 'react'
import { TableCell } from '@mui/material'
import { grey } from '@mui/material/colors'


const CustomInfoCell: React.FC<{content: string}> = ({ content }) =>{
  return(
    <TableCell
      sx={{
        backgroundColor: `${grey[900]} !important`,
        fontSize: "20px",
        textAlign: "center",
        width: "70px",
      }}
    >
      {content}
    </TableCell>
  )
}

export default CustomInfoCell;
