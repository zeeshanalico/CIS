import { useState, useEffect } from 'react';

interface PaginationOptions {
  totalItems: number;
  itemsPerPage: number;
  initialPage?: number;
}

const usePagination = ({ totalItems, itemsPerPage, initialPage = 1 }: PaginationOptions) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(Math.ceil(totalItems / itemsPerPage));

  useEffect(() => {
    setTotalPages(Math.ceil(totalItems / itemsPerPage));
  }, [totalItems, itemsPerPage]);

  const goToNextPage = () => {
    setCurrentPage((prevPage) => (prevPage < totalPages ? prevPage + 1 : prevPage));
  };

  const goToPrevPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return {
    currentPage,
    totalPages,
    goToNextPage,
    goToPrevPage,
    goToPage,
    setItemsPerPage: setTotalPages, // You can change items per page dynamically
  };
};

export default usePagination;
