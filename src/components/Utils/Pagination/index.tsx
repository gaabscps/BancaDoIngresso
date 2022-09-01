/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import { usePagination, DOTS } from './usePagination';

interface PaginationProps {
  total?: number;
  pageSize: number;
  siblingCount?: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  totalCount: number;
}

const NewPagination: React.FC<PaginationProps> = (props: PaginationProps) => {
  const {
    onPageChange,
    totalCount = 1,
    siblingCount = 1,
    currentPage = 1,
    pageSize = 1,
  }: PaginationProps = props;
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });
  const lastPage = paginationRange && paginationRange[paginationRange.length - 1];

  if (currentPage === 0 || (paginationRange && paginationRange.length < 2)) {
    return null;
  }
  const onNext = () => {
    if (currentPage !== lastPage) onPageChange(currentPage + 1);
  };
  const onPrevious = () => {
    if (currentPage !== 1) onPageChange(currentPage - 1);
  };
  return (
    <ul className="pagination-container">
      <li className={currentPage === 1 ? 'disabled' : ''}>
        <span
          aria-label="Previous"
          className={`previous-pagination ${currentPage === 1 ? 'disabled' : ''}`}
          onClick={onPrevious}
        >
          «
        </span>
      </li>
      {paginationRange?.map(pageNumber => {
        if (pageNumber === DOTS) {
          return (
            <li>
              <span className="disabled" aria-disabled>
                &#8230;
              </span>
            </li>
          );
        }
        return (
          <li key={pageNumber} className={`${pageNumber === currentPage ? 'active' : ''}`}>
            <span onClick={() => onPageChange(+pageNumber)}>{pageNumber}</span>
          </li>
        );
      })}
      <li className={currentPage === lastPage ? 'disabled' : ''}>
        <span
          aria-label="Next"
          className={`next-pagination ${currentPage === lastPage ? 'disabled' : ''}`}
          onClick={onNext}
        >
          »
        </span>
      </li>
    </ul>
  );
};
export default NewPagination;
