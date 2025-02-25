import React, { useState, useMemo, useCallback } from "react";

export interface Filter {
  label: string;
  type: "text" | "list" | "date";
  key: string;
  options?: string[];
}

interface FilterBarProps {
  filters: Filter[];
  onApplyFilter: (key: string, value: string) => void;
  onClearFilters: () => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ filters, onApplyFilter, onClearFilters }) => {
  const [filterValues, setFilterValues] = useState<{ [key: string]: string }>({});
  const [activeFilter, setActiveFilter] = useState<{ key: string; value: string } | null>(null);
  const [isNewFilter, setIsNewFilter] = useState(false);

  const formatDateForAPI = (dateString: string): string => {
    return new Date(dateString).toISOString().split("T")[0];
  };

  const handleInputChange = (key: string, value: string) => {
    setFilterValues((prev) => {
      const newFilters: { [key: string]: string } = {};
      filters.forEach((filter) => {
        newFilters[filter.key] = filter.key === key ? value : "";
      });
      return newFilters;
    });
    setIsNewFilter(true);
  };

  const handleApplyFilter = useCallback(() => {
    const newFilter = Object.entries(filterValues).find(([_, value]) => value);
    if (newFilter) {
      const [key, value] = newFilter;
      const formattedValue = filters.find((f) => f.key === key)?.type === "date" ? formatDateForAPI(value) : value;
      setActiveFilter({ key, value: formattedValue });
      setIsNewFilter(false);
      onApplyFilter(key, formattedValue);
    }
  }, [filterValues, filters, onApplyFilter]);

  const handleClearFilters = useCallback(() => {
    setFilterValues({});
    setActiveFilter(null);
    setIsNewFilter(false);
    onClearFilters();
  }, [onClearFilters]);

  const formattedFilters = useMemo(() => filters, [filters]);

  return (
    <div className="flex items-center flex-wrap gap-2">
      {formattedFilters.map((filter) => (
        <div key={filter.key} className="flex items-center">
          {filter.type === "text" && (
            <input
              type="text"
              className="border border-grey px-2 py-2 h-10 rounded w-24 md:w-28 text-black"
              placeholder={filter.label}
              value={filterValues[filter.key] || ""}
              onChange={(e) => handleInputChange(filter.key, e.target.value)}
            />
          )}
          {filter.type === "date" && (
            <input
              type="date"
              className="border border-grey px-2 py-2 h-10 rounded w-28 md:w-32 text-black"
              value={filterValues[filter.key] || ""}
              onChange={(e) => handleInputChange(filter.key, e.target.value)}
            />
          )}
          {filter.type === "list" && filter.options && (
            <select
              className="border border-grey px-2 py-2 h-10 rounded w-24 md:w-28 text-black bg-white"
              value={filterValues[filter.key] || ""}
              onChange={(e) => handleInputChange(filter.key, e.target.value)}
            >
              <option value="">{filter.label}</option>
              {filter.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}
        </div>
      ))}
      <button
        className={`px-4 py-2 h-10 rounded whitespace-nowrap ${
          activeFilter && !isNewFilter ? "bg-red-500 text-white" : "bg-blue text-black"
        }`}
        onClick={activeFilter && !isNewFilter ? handleClearFilters : handleApplyFilter}
        disabled={!isNewFilter && !activeFilter}
      >
        {activeFilter && !isNewFilter ? "Clear Filter" : "Apply Filter"}
      </button>
    </div>
  );
};

export default FilterBar;
