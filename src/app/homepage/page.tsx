"use client";

import React from 'react';
import Table from '@/components/ui/table';

export default function Page() {
  return (
    <main className="flex flex-col p-6">
      <div className="bg-slate-700 h-20 flex items-center mb-6 rounded-lg">
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
      <Table />
    </main>
  );
}
