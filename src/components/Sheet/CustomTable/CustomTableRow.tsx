import React, { memo } from 'react';
import { TableRow } from '@mui/material';
import _ from 'lodash';
import CustomInfoCell from './CustomInfoCell';
import CustomTableCell from './CustomTableCell';
import { CellClassObjectType } from '../../../utility/Classes';

type Props={
  y: number,
  rowArr: Array<CellClassObjectType>,
  cloneAndSetTableCell: Function
};

function arePropsEqual(oldProps: Props, newProps: Props){
  // const  sample = {
  //   y: _.isEqual(oldProps.y, newProps.y),
  //   rowArr: _.isEqual(oldProps.rowArr, newProps.rowArr),
  //   cloneAndSetTableCell: _.isEqual(oldProps.cloneAndSetTableCell, newProps.cloneAndSetTableCell),
  // };

  // console.table(sample);
  return _.isEqual(oldProps, newProps)
}

const CustomTableRow: React.FC<Props> = memo( ({y,rowArr, cloneAndSetTableCell}) =>{
  return(
  <TableRow key={y + 1}>
    <CustomInfoCell content={ (y+1).toString() } />
    {rowArr.map((cell: CellClassObjectType, x) => (
      <CustomTableCell
        cell={cell}
        cloneAndSetTableCell={cloneAndSetTableCell}
        key={`td-${x}-${y}`}
      />
    ))}
  </TableRow>
  );
}, arePropsEqual);

export default CustomTableRow;
