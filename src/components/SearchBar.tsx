import React, { useState, useRef, useCallback } from "react";
import { FiSearch } from "react-icons/fi";

interface SearchBarProps {
  placeholder?: string;
  onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder = "Search...", onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showInput, setShowInput] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  }, [onSearch]);

  const toggleSearch = useCallback(() => {
    if (showInput) {
      setSearchTerm("");
      onSearch("");
    }
    setShowInput((prev) => !prev);

    setTimeout(() => {
      if (!showInput && inputRef.current) {
        inputRef.current.focus();
      }
    }, 100);
  }, [showInput, onSearch]);

  return (
    <div className="flex items-center space-x-2">
    <button
      onClick={toggleSearch}
      className="h-10 w-10 flex items-center justify-center rounded text-black hover:bg-blue transition duration-200"
      aria-label={showInput ? "Close search" : "Open search"}
    >
      <FiSearch size={20} className="text-gray-600 hover:text-black transition duration-200" />
    </button>
    {showInput && (
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        className="border border-grey px-2 py-2 h-10 rounded text-black"
        value={searchTerm}
        onChange={handleSearch}
      />
    )}
  </div>
  
  );
};

export default SearchBar;
