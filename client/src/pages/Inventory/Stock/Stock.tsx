import React from 'react'
import { useGetProductsQuery } from '@/store/slices/productSlice/productApiSlice'
import usePagination from '@/components/hooks/usePagination';
import Table, { Th, Td, Tr } from '@/components/ui/Table';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts,setPage, setExtraInfo, setLimit } from '@/store/slices/productSlice/productSlice';
import { RootState } from '@/store/store';
const Stock = () => {
  const { products, extraInfo, limit, page } = useSelector((state: RootState) => state.productSlice);
  const { data: productsResponse } = useGetProductsQuery({ limit, page });
  const dispatch = useDispatch();


  const {
    currentPage,
    totalPages,
    goToNextPage,
    goToPrevPage,
    goToPage,
  } = usePagination({
    totalItems: extraInfo.count,
    itemsPerPage: limit,
  });
  useEffect(() => {
    if (productsResponse?.result) {
      dispatch(setProducts(productsResponse.result));
    }
    if (productsResponse?.extraInfo) {
      dispatch(setExtraInfo(productsResponse.extraInfo));
    }
  }, [productsResponse, dispatch]);


  return (
    <div className="mx-auto flex flex-col">
      <div className="flex flex-row justify-between">
        <h1 className="text-2xl font-semibold mb-4">Existing Products</h1>
        <div className="flex flex-row gap-2 items-center">
          <p className="text-sm text-gray-500">Showing <span className="font-medium">{extraInfo.from}</span> to <span className="font-medium">{extraInfo.to}</span> of <span className="font-medium">{extraInfo.count}</span> results</p>
          <select
            className="h-8 outline-none border border-gray-300 rounded"
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => dispatch(setLimit(Number(e.target.value)))}
            value={limit}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>
      </div>
      <div className="overflow-x-auto scrollbar-style shadow-xl">
        <Table>
          <thead>
            <tr>
              <Th heading="Sr." />
              <Th heading="Name" />
              <Th heading="Category" />
              <Th heading="Qty" />
              <Th heading="Sale Price" />
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <Tr key={product.id}>
                <Td>{index + 1 + (currentPage - 1) * limit}</Td>
                <Td>{product.name}</Td>
                <Td>{product.category?.name}</Td>
                <Td>{product.quantity}</Td>
                <Td>{product.sale_price}</Td>

              </Tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div className="flex flex-row justify-between mt-3">
        <div></div>
        <div className="inline-flex rounded-md shadow-sm m-auto" role="group">
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
            onClick={() => {
              dispatch(setPage(page - 1))
              goToPrevPage()
            }} disabled={currentPage === 1}
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              type="button"
              className={`px-4 py-2 text-sm font-medium ${currentPage === i + 1 ? 'text-blue-700 bg-gray-200' : 'text-gray-900 bg-white'} border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white`}
              onClick={() => {
                dispatch(setPage(i + 1))
                goToPage(i + 1)
              }}
            >
              {i + 1}
            </button>
          ))}
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
            onClick={() => {
              dispatch(setPage(page + 1))
              goToNextPage()
            }} disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
        <div></div>
      </div>
    </div>

  )
}

export default Stock