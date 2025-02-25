import React, { useMemo } from "react";

interface PaginationProps {
  total: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ total, pageSize, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(total / pageSize);
  const maxVisiblePages = 5;

  const getPaginationItems = useMemo(() => {
    const pages: (number | string)[] = [];

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      const halfRange = Math.floor(maxVisiblePages / 2);
      let start = Math.max(1, currentPage - halfRange);
      let end = Math.min(totalPages, currentPage + halfRange);

      if (start === 1) {
        end = maxVisiblePages;
      } else if (end === totalPages) {
        start = totalPages - maxVisiblePages + 1;
      }

      if (start > 1) pages.push(1, "...");
      for (let i = start; i <= end; i++) pages.push(i);
      if (end < totalPages) pages.push("...", totalPages);
    }

    return pages;
  }, [totalPages, currentPage]);

  return (
    <div className="flex justify-center items-center mt-12 space-x-3 text-black text-lg">
      <button
        className="px-2 text-lg disabled:opacity-50"
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
      >
        ←
      </button>
      {getPaginationItems.map((item, index) =>
        item === "..." ? (
          <span key={index} className="px-2 text-black">...</span>
        ) : (
          <button
            key={index}
            className={`px-2 transition ${
              currentPage === item ? "font-bold -translate-y-3" : "hover:text-gray-600"
            }`}
            onClick={() => onPageChange(Number(item))}
          >
            {item}
          </button>
        )
      )}
      <button
        className="px-2 text-lg disabled:opacity-50"
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
      >
        →
      </button>
    </div>
  );
};

export default Pagination;
