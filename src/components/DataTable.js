import React, { useMemo } from "react";
// import "./index.css";
import Data from "../csvjson.json"
import { COLUMNS } from './Columns'
import { useTable } from "react-table";
import './DataTable.css'

export const DataTable = () => {
    
    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => Data, []) 

    const tableInstance = useTable({
        columns,
        data
    })

    const { 
        getTableProps, 
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance

    return (
        <table {...getTableProps()}>
            <thead>
                {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                        <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                    ))}
                </tr>   
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}> 
                            {row.cells.map((cell) => {
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            })}
                            <td></td>        
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}