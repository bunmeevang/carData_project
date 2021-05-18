import React from 'react'
import './DataTable.css'

export const GlobalFilter = ({ filter, setFilter}) => {
    return(
        <span>
            Search:{' '}
            <input value={filter || ''} onChange={(e) => setFilter(e.target.value)} />
        </span>
    )
}