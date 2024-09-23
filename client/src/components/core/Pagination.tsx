// import React from 'react';
// import { useDispatch } from 'react-redux';
// interface PaginationProps {
//     currentPage: number;
//     totalPages: number;
//     onPageChange: (page: number) => void;
//     goToPrevPage: () => void;
//     goToNextPage: () => void;
//     setPage:(number:number)=>void
// }

// const Pagination: React.FC<PaginationProps> = ({ setPage,currentPage, totalPages, onPageChange, goToPrevPage, goToNextPage }) => {
//     const dispatch = useDispatch()
//     return (
//         // <div className="flex m-2 justify-center rounded-md shadow-sm m-auto" role="group">
//         //     <button
//         //         type="button"
//         //         className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
//         //         onClick={goToPrevPage}
//         //         disabled={currentPage === 1}
//         //     >
//         //         Prev
//         //     </button>
//         //     {Array.from({ length: totalPages }, (_, i) => (
//         //         <button
//         //             key={i}
//         //             type="button"
//         //             className={`px-4 py-2 text-sm font-medium ${currentPage === i + 1 ? 'text-blue-700 bg-gray-200' : 'text-gray-900 bg-white'
//         //                 } border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white`}
//         //             onClick={() => onPageChange(i + 1)}
//         //         >
//         //             {i + 1}
//         //         </button>
//         //     ))}
//         //     <button
//         //         type="button"
//         //         className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
//         //         onClick={goToNextPage}
//         //         disabled={currentPage === totalPages}
//         //     >
//         //         Next
//         //     </button>
//         // </div>



// <div className="flex m-2 justify-center rounded-md shadow-sm m-auto" role="group">
//                 <button
//                     type="button"
//                     className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
//                     onClick={() => {
//                         dispatch(setPage(page - 1))
//                         goToPrevPage()
//                     }} disabled={currentPage === 1}
//                 >
//                     Prev
//                 </button>
//                 {Array.from({ length: totalPages }, (_, i) => (
//                     <button
//                         key={i}
//                         type="button"
//                         className={`px-4 py-2 text-sm font-medium ${currentPage === i + 1 ? 'text-blue-700 bg-gray-200' : 'text-gray-900 bg-white'} border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white`}
//                         onClick={() => {
//                             dispatch(setPage(i + 1))
//                             goToPage(i + 1)
//                         }}
//                     >
//                         {i + 1}
//                     </button>
//                 ))}
//                 <button
//                     type="button"
//                     className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
//                     onClick={() => {
//                         dispatch(setPage(page + 1))
//                         goToNextPage()
//                     }} disabled={currentPage === totalPages}
//                 >
//                     Next
//                 </button>
//             </div> 

//     );
// };

// export default Pagination;
