import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

/* eslint-disable react/prop-types */
const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  onNextPage,
  onPrevPage,
}) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    const totalNumbersToShow = maxPagesToShow + 2; // current, first, last, and two ellipses

    if (totalPages <= totalNumbersToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1); // Always show the first page

      const startPage = Math.max(2, currentPage - 2);
      const endPage = Math.min(totalPages - 1, currentPage + 2);

      if (startPage > 2) {
        pages.push("...");
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < totalPages - 1) {
        pages.push("...");
      }

      pages.push(totalPages); // Always show the last page
    }

    return pages;
  };

  return (
    <div className="my-4  flex  justify-end">
      <ul className="inline-flex p-2 px-6 rounded-md  shadow-lg shadow-sky-200 bg-white list-none">
        <li>
          <button
            onClick={onPrevPage}
            className={`mx-1 hover:bg-sky-400 hover:text-white rounded-lg p-1 border ${
              currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
            }`}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            <BiChevronLeft className="text-2xl" />
          </button>
        </li>
        {getPageNumbers().map((number, index) => (
          <li key={index}>
            {number === "..." ? (
              <span className="mx-2">...</span>
            ) : (
              <button
                className={`mx-1 px-3 hover:bg-sky-400 hover:text-white rounded-lg py-1 border ${
                  currentPage === number ? "bg-sky-400 text-white" : ""
                }`}
                onClick={() => onPageChange(number)}
                aria-label={`Page ${number}`}
              >
                {number}
              </button>
            )}
          </li>
        ))}
        <li>
          <button
            onClick={onNextPage}
            className={`mx-1 hover:bg-sky-400 hover:text-white rounded-lg p-1 border ${
              currentPage === totalPages ? "cursor-not-allowed opacity-50" : ""
            }`}
            disabled={currentPage === totalPages}
            aria-label="Next page"
          >
            <BiChevronRight className="text-2xl" />
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;