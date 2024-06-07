"use client";

import React, { useEffect, useState } from 'react';
import PaginatedTable from '@/components/ui/paginated-table';
import { ChatAPI } from '@/api/chat';
import { RequestQuery } from '@/types/chats/requestquery';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  const [numberOfChats, setNumberOfChats] = useState<number>(0);
  const [numberofPendingRequestQuery, setNumberOfPendingRequestQuery] = useState<number>(0);
  const [numberofWaitingForReviewRequestQuery, setNumberOfWaitingForReviewRequestQuery] = useState<number>(0);
  const [requestQueryData, setRequestQueryData] = useState<RequestQuery[]>([]);

  const headers = ["id", "chatId", "status", "type", "timestamp", "View Chat"];

  const today = new Date();

  function formatDate(date: Date) {
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
  
    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
  
    return `${day} ${month} ${year}`;
  }

  const testData = [
    { id: 101, chatId: 0x1A23D25DF42, type: 'Request', status: 'Pending', timestamp: formatDate(today), "View Chat": 'View' },
  ];

  useEffect(() => {
    ChatAPI.getAll().then((chats) => setNumberOfChats(chats.length));
    ChatAPI.getAllPendingRequestQuery().then((requests) => setNumberOfPendingRequestQuery(requests.length));
    ChatAPI.getAllWaitingforReview().then((requests) => setNumberOfWaitingForReviewRequestQuery(requests.length));
    ChatAPI.getAllRequestQueries().then((requestQueries) => setRequestQueryData(requestQueries));
  }, [numberOfChats, numberofPendingRequestQuery]);

  const actualData = requestQueryData.map((rq) => ({
    id: rq.id,
    chatId: rq.chatId,
    status: rq.status,
    type: rq.type,
    timestamp: formatDate(rq.timestamp),
    "View Chat": 'View',
  }));

  const handleLastColumnButtonClick = (rowData: { [key: string]: any }) => {
    // Handle the button click event here
    alert(`Button clicked for row with ID: ${rowData.chatId}`);
    router.push(`/chats/:${rowData.chatId}`);
  };

  return (
    <main className="flex flex-col p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-100 h-64 flex items-center justify-center rounded-lg shadow-md">
          <span>
            {!numberOfChats ? (
              <span><span className="text-3xl font-bold">{numberOfChats}</span> total chat</span>
            ) : (
              'There are no chat.'
            )}
          </span>
        </div>
        <div className="bg-gray-100 h-64 flex items-center justify-center rounded-lg shadow-md">
          <span>
            {!numberofPendingRequestQuery ? (
              <span><span className="text-3xl font-bold">{numberofPendingRequestQuery}</span> pending request</span>
            ) : (
              'There are no pending request.'
            )}
          </span>
        </div>
        <div className="bg-gray-100 h-64 flex items-center justify-center rounded-lg shadow-md">
          <span>
            {!numberofWaitingForReviewRequestQuery ? (
              <span><span className="text-3xl font-bold">{numberofWaitingForReviewRequestQuery}</span> waiting for review</span>
            ) : (
              'There are no closed request waiting for review.'
            )}
          </span>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <PaginatedTable headers={headers} data={testData} onLastColumnButtonClick={handleLastColumnButtonClick} />
      </div>
    </main>
  );
}
