import { useEffect } from "react";

const { useRouter } = require("next/router");

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const router = useRouter();
    const {locale}  = router;
    const query = router.query; 
    
  
    const handlePageChange = (page) => {
      onPageChange(page);  
    };
  
    const handlePrevious = (e) => {
      if (currentPage > 1) {
        handlePageChange(currentPage - 1); 
      }   
    };
  
    const handleNext = () => {
      if (currentPage < totalPages) {
        handlePageChange(currentPage + 1); 
      }  
    };
  
    const handleNumberedPage = (page) => {
      handlePageChange(page);  
    };
    useEffect(() => {
       setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth', // You can change this to 'auto' for an instant scroll
        }); 
       }, 800);
    },[query?.page])
  
    const getPageNumbers = () => {
      const pageNumbers = [];
      const maxVisiblePages = 3;
  
      let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
      let endPage = startPage + maxVisiblePages - 1;
  
      if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }
  
      for (let page = startPage; page <= endPage; page++) {
        pageNumbers.push(page);
      }
  
      return pageNumbers;
    };
  
  
    return (
      <div>
        <button
          onClick={handlePrevious}
          className={
            currentPage > 1 ? "pagination-btn geo-font-bold" : "pagination-btn p-p-disable geo-font-bold"
          }
        >
          {
            locale == 'ka' ?
            'წინა' : 'Prev'
          } 
        </button>
  
        {getPageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => handleNumberedPage(page)}
            disabled={currentPage === page}
            className={
              currentPage === page
                ? "pagination-number-disable pagination-number "
                : "pagination-number"
            }
          >
            {page}
          </button>
        ))}
  
        <button
          onClick={handleNext}
          className={
            currentPage < totalPages
              ? "pagination-btn geo-font-bold"
              : "pagination-btn p-p-disable geo-font-bold"
          }
        >
          {
            locale == 'ka' ?
            'შემდეგი' : 'Next'
          } 
        </button>
      </div>
    );
  };

  export default Pagination