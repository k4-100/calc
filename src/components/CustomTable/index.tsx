import React  from 'react'
import _ from 'lodash'
import { createTable, useTableInstance } from '@tanstack/react-table'


const table = createTable()
/**
 * 
 * @returns Table with cells 
 */
const CustomTable: React.FC = () =>{
  const instance = usetableInstance(table, {} )
  
  return(
    <h1>sda</h1>
  )
}

export default CustomTable