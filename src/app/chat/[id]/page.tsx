"use client";

import { useParams, useRouter } from "next/navigation";

export default function Chat() {
  const router = useRouter();

  const { id } = useParams();

  return (
    <main className="flex justify-center grid grid-cols-4 max-h-full">
      <div className="flex col-span-1">
      </div>

      <div className="flex col-span-2 h-screen bg-gray-300 grid grid-rows-12 p-4 items-end">
        <span className="justify-start row-span-1 font-extrabold text-2xl">Chat# {id}</span>
        <span className="justify-start row-span-1 font-medium text-l p-1 ">Action Required</span>
        <div className="justify-start row-span-2 w-full h-full bg-gray-100  border-4 border-gray-600">
  
        </div>

        <span className="justify-start row-span-1 font-medium text-l p-1">Ongoing Request</span>
        <div className="justify-start row-span-3 w-full h-full bg-gray-100  border-4 border-gray-600">
  
        </div>

        <span className="justify-start row-span-1 font-medium text-l p-1">Past Rsequest</span>
        <div className="justify-start row-span-2 w-full h-full bg-gray-200  border-4 border-gray-600">
  
        </div>
      </div>
      <div className="flex col-span-1 h-full grid grid-rows-12 bg-gray-300 p-4">
        <span className="justify-center h-1/2 text-center row-span-2 border-4 border-orange-500 p-2 bg-orange-300 rounded-lg font-medium text-2xl " >
          Pending
        </span>
        <div className="flex justify-center text-center row-span-9 items-center border-4 border-gray-600">
          chat component placeholder
        </div>
      </div>
    </main>
  );
}
