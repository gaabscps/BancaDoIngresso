/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import { usePagination, DOTS } from './usePagination';

interface PaginationProps {
  total?: number;
  pageSize?: number;
  siblingCount?: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
  totalCount?: number;
}

const NewPagination: React.FC<PaginationProps> = (props: PaginationProps) => {
  const { onPageChange, totalCount = 0, siblingCount = 0, currentPage = 0, pageSize = 0 } = props;
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });
  if (currentPage === 0 || (paginationRange && paginationRange.length < 2)) {
    return null;
  }
  const onNext = () => {
    onPageChange(currentPage + 1);
  };
  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };
  const lastPage = paginationRange?.[paginationRange.length - 1];
  return (
    <div>
      <nav>
        <ul className="pagination-container">
          <li>
            <a
              href="#"
              aria-label="Previous"
              className={`previous-pagination ${currentPage === 1 ? 'disabled' : ''}`}
              onClick={onPrevious}
            >
              <span aria-hidden="true">«</span>
            </a>
          </li>
          {paginationRange?.map(pageNumber => {
            if (pageNumber === DOTS) {
              return (
                <li>
                  <a href="#">&#8230;</a>
                </li>
              );
            }
            return (
              <li key={pageNumber} className={`${pageNumber === currentPage ? 'active' : ''}`}>
                <a href="#">{pageNumber}</a>
              </li>
            );
          })}
          <li>
            <a
              href="#"
              aria-label="Next"
              className={`next-pagination ${currentPage === lastPage ? 'disabled' : ''}`}
              onClick={onNext}
            >
              <span aria-hidden="true">»</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default NewPagination;
