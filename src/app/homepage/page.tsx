"use client";

import React from 'react';
import PaginatedTable from '@/components/ui/paginated-table';

export default function Page() {
  const headers = ["ID", "Room Number", "Last Name", "Type", "Status", "Date", "View Chat"];
  const data = [
    { ID: 1, "Room Number": 101, "Last Name": 'Smith', Type: 'Standard', Status: 'Occupied', Date: '2024-05-30', "View Chat": 'View' },
    // Add more data as needed
  ];

  const handleLastColumnButtonClick = (rowData: { [key: string]: any }) => {
    // Handle the button click event here
    alert(`Button clicked for row with ID: ${rowData.ID}`);
  };

  return (
    <main className="flex flex-col p-6">
      <div className="bg-gray-500 h-20 flex items-center mb-6 rounded-lg">
        <h1 className="text-right text-xl w-full mr-4">Welcome!</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-gray-200 h-64 flex items-center justify-center rounded-lg">
          <span>Chart 1 Placeholder</span>
        </div>
        <div className="bg-gray-200 h-64 flex items-center justify-center rounded-lg">
          <span>Chart 2 Placeholder</span>
        </div>
        <div className="bg-gray-200 h-64 flex items-center justify-center rounded-lg">
          <span>Chart 3 Placeholder</span>
        </div>
      </div>
      <PaginatedTable headers={headers} data={data} onLastColumnButtonClick={handleLastColumnButtonClick} />
    </main>
  );
}
