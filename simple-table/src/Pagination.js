import React from 'react';


const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    let pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`pagination-link ${currentPage === i ? 'active' : ''}`}
          aria-current={currentPage === i ? 'page' : undefined}
        >
          {i}
        </button>
      );
    }
  
    return <div className="pagination">{pages}</div>;
  };  

export default Pagination;
