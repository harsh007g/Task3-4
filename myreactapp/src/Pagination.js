// import React from 'react';

// function Pagination({ itemsPerPage, totalItems, currentPage, setCurrentPage }) {
//   const pageNumbers = [];

//   for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
//     pageNumbers.push(i);
//   }

//   return (
//     <nav>
//       <ul className='pagination'>
//         {pageNumbers.map(number => (
//           <li key={number} className='page-item'>
//             <button onClick={() => setCurrentPage(number)} className='page-link'>
//               {number}
//             </button>
//           </li>
//         ))}
//       </ul>
//     </nav>
//   );
// }

// export default Pagination;

