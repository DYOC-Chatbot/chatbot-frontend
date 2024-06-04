import React, { useState } from "react";
import { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell } from "./table";
import { Button } from "./button";

interface RowData {
  [key: string]: any;
}

interface PaginatedTableProps {
  headers: string[];
  data: RowData[];
  onLastColumnButtonClick: (rowData: RowData) => void;
}

const PaginatedTable: React.FC<PaginatedTableProps> = ({ headers, data, onLastColumnButtonClick }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const totalPages = Math.ceil(data.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + rowsPerPage);

  return (
    <div>
      <div className="overflow-x-auto">
        <Table className="min-w-full bg-white rounded-lg shadow-md">
          <TableHeader>
            <TableRow>
              {headers.map((header, index) => (
                <TableHead key={index}>{header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {headers.map((header, cellIndex) => (
                  <TableCell key={cellIndex}>
                    {header === headers[headers.length - 1] ? (
                      <button
                        className="text-blue-500 hover:underline"
                        onClick={() => onLastColumnButtonClick(row)}
                      >
                        {row[header as keyof RowData]}
                      </button>
                    ) : (
                      row[header as keyof RowData]
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-between mt-4">
        <Button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
          Previous
        </Button>
        <span>Page {currentPage} of {totalPages}</span>
        <Button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default PaginatedTable;
