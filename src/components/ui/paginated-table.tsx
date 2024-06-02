// components/PaginatedTable.tsx
import React, { useState } from "react"
import { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell } from "./table"
import { Button } from "./button"

interface RowData {
  id: number;
  room: number;
  lastName: string;
  type: string;
  status: string;
  date: string;
}

const PaginatedTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const data: RowData[] = [
    { id: 1, room: 101, lastName: 'Smith', type: 'Standard', status: 'Occupied', date: '2024-05-30' },
    // Add more data as needed
  ];

  const totalPages = Math.ceil(data.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + rowsPerPage);

  return (
    <div>
      <div className="overflow-x-auto">
        <Table className="min-w-full bg-white rounded-lg shadow-md">
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Room Number</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>View Chat</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.room}</TableCell>
                <TableCell>{row.lastName}</TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell className="text-gray-500 cursor-pointer">View</TableCell>
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
