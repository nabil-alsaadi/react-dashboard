import React, { useMemo } from "react";

const formatHeader = (key: string) => {
  return key
    .replace(/([A-Z])/g, " $1") // Insert space before capital letters
    .replace(/^./, (str) => str.toUpperCase()); // Capitalize first letter
};

interface TableProps {
  columns: string[]; 
  data: any[];
}

const DataTable: React.FC<TableProps> = ({ columns, data }) => {
  const formattedColumns = useMemo(() => columns.map(formatHeader), [columns]);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-grey">
        <thead className="bg-blue text-black">
          <tr>
            {formattedColumns.map((header, index) => (
              <th key={index} className="p-2 border border-grey text-left">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="p-4 text-center text-gray-500">
                No results found
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} className="border border-grey hover:bg-grey transition duration-200">
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className="p-2 border border-grey">
                    {row[col] !== undefined ? row[col] : "-"}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
