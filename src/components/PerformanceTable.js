import React, { useMemo } from "react";
// import "./index.css";
import Data from "../csvjson.json"
import { PERFCOLUMNS } from './PerfColumns'
import { useTable, usePagination, useGlobalFilter } from "react-table";
import './PaginationTable.css'
import { GlobalFilter } from "./GlobalFilter";

export const PerformanceTable = () => {
    
    const columns = useMemo(() => PERFCOLUMNS, [])
    const data = useMemo(() => Data, []) 

    const { 
        getTableProps, 
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        gotoPage,
        pageCount,
        setPageSize,
        state,
        setGlobalFilter,
        prepareRow,
    } = useTable(
        {
            columns,
            data,
        },
        useGlobalFilter,
        usePagination
    )

    const { globalFilter } = state
    const { pageIndex,  pageSize } = state   

    return (
        <>
        <div className='searchBar'>
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}/>
        </div>
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
                {page.map((row) => {
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
        <div className='buttonPage'>
            <span>
                Page{' '}
                <strong>
                    {pageIndex + 1} of {pageOptions.length}
                </strong>{' '}
            </span>
            <span>
                Go to page: {' '}
                <input type='number' defaultValue={pageIndex + 1} 
                onChange={e => {
                    const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
                    gotoPage(pageNumber)
                    }} 
                    style={{ width: '100px' }}
                    />
            </span>
            <select value={pageSize} onChange={e => setPageSize(Number(e.target.value))}>
                    {
                        [10,25,50,100].map((pageSize) => (
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))}
            </select>
            <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>
            <button onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</button>
            <button onClick={() => nextPage()} disabled={!canNextPage}>Next</button>
            <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{'>>'}</button>
        </div>
        </>
    )
}