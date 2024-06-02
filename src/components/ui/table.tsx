import React, { useState } from 'react';

const Table = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5; // Adjust as needed
  const data = [
    { id: 1, room: 101, lastName: 'Smith', type: 'Standard', status: 'Occupied', date: '2024-05-30' },
    { id: 2, room: 102, lastName: 'Johnson', type: 'Double Bed', status: 'Pending', date: '2024-05-30' },
    { id: 3, room: 103, lastName: 'Williams', type: 'Standard', status: 'Occupied', date: '2024-05-30' },
    { id: 4, room: 104, lastName: 'Jones', type: 'Standard', status: 'Pending', date: '2024-05-30' },
    { id: 5, room: 105, lastName: 'Brown', type: 'Standard', status: 'Occupied', date: '2024-05-30' },
    { id: 6, room: 106, lastName: 'Davis', type: 'Standard', status: 'Occupied', date: '2024-05-30' },
  ];

  const totalPages = Math.ceil(data.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + rowsPerPage);

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">ID</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Room Number</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Last Name</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Type</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Status</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Date</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">View Chat</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row) => (
              <tr key={row.id}>
                <td className="px-6 py-4 border-b border-gray-200">{row.id}</td>
                <td className="px-6 py-4 border-b border-gray-200">{row.room}</td>
                <td className="px-6 py-4 border-b border-gray-200">{row.lastName}</td>
                <td className="px-6 py-4 border-b border-gray-200">{row.type}</td>
                <td className="px-6 py-4 border-b border-gray-200">{row.status}</td>
                <td className="px-6 py-4 border-b border-gray-200">{row.date}</td>
                <td className="px-6 py-4 border-b border-gray-200 text-blue-500 cursor-pointer">View</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="px-4 py-2 bg-slate-700 text-white rounded-lg"
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          className="px-4 py-2 bg-slate-700 text-white rounded-lg"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Table;
