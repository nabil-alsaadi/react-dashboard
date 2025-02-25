import React from "react";
import { PAGE_SIZE_OPTIONS } from "../constants/constants";

interface PageSizeSelectorProps {
  pageSize: number;
  onPageSizeChange: (size: number) => void;
}

const PageSizeSelector: React.FC<PageSizeSelectorProps> = ({ pageSize, onPageSizeChange }) => {
  return (
    <div className="flex items-center space-x-2">
      <select
        id="page-size"
        aria-label="Select number of entries per page"
        className="h-10 px-2 py-2 rounded border border-gray-300 bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue text-black"
        value={pageSize}
        onChange={(e) => onPageSizeChange(Number(e.target.value))}
      >
        {PAGE_SIZE_OPTIONS.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
      <span className="text-black">entries</span>
    </div>
  );
};

export default PageSizeSelector;
