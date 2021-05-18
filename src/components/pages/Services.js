import React from 'react';
// import styles from "./Services.module.css";
// import Data from "../../csvjson.json"
// import TableScrollbar from 'react-table-scrollbar';
// import { DataTable } from '../../components/DataTable'
import { PaginationTable } from '../PaginationTable';

// function Services() {
//     return(
//         <div className="carTable">
//             <div className="models">
//                 { Data.map(post => {
//                     return(
//                         // <h4>{ post.model_make_id}</h4>
//                         <TableScrollbar>
//                             <table className={styles.fixed_header}>
//                                 <thead>
//                                     <tr>
//                                         <th>Make</th>
//                                         <th>Models</th>
//                                         <th>Trim</th>
//                                         <th>Year</th>
//                                     </tr>
//                                 </thead>
//                                     <tr>
//                                         <td>{post.model_make_id}</td>
//                                         <td>{post.model_name}</td>
//                                         <td>{post.model_trim}</td>
//                                         <td>{post.model_year}</td>
//                                     </tr>
//                             </table>
//                         </TableScrollbar>
//                     )
//                 })}
//             </div>
//         </div>
//     )
// }
function Service() {
    return (
        <div>
            {/* <DataTable /> */}
            <PaginationTable />
        </div>
    )
}

export default Service;