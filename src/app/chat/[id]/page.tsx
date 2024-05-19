"use client";

import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import DialogTemplate from "@/components/ui/dialog";
import { Slot } from "@radix-ui/react-slot";


export default function Chat() {
  const router = useRouter();

  const { id } = useParams(); 
  
  const [actionsRequired, setActionsRequired] = useState(["action1"]);
  
  const [pastRequests, setPastRequests] = useState(["request1"]);
  


  
  useEffect(() => {

  }, [id])

  const getPastRequest = async (chatId : number) => {
    try {

    } catch {

    } finally {

    }
  }

  return (

      <main className="flex justify-center grid grid-cols-4 max-h-full">
        <div className="flex col-span-1">
        </div>

        <div className="flex col-span-2 h-screen bg-gray-300 grid grid-rows-12 p-4 items-end">
          <span className="justify-start row-span-1 font-extrabold text-4xl">Chat# {id}</span>
          <span className="justify-start row-span-1 font-medium text-l p-1 ">
            Action Required
            <Slot></Slot>
            <DialogTemplate buttonContent={1} title="action required" description={"placeholder"}></DialogTemplate>
          </span>
          
          <div className="justify-start row-span-2 w-full h-full bg-gray-100  border-4 border-gray-600 p-2">
            {actionsRequired}
          </div>


          <span className="justify-start row-span-1 font-medium text-l p-1">Ongoing Request</span>
          <div className="justify-start row-span-3 w-full h-full bg-gray-100  border-4 border-gray-600 p-2">
    
          </div>

          <span className="justify-start row-span-1 font-medium text-l p-1">Past Rsequest</span>
          <div className="justify-start row-span-2 w-full h-full bg-gray-200  border-4 border-gray-600 p-2">
            {pastRequests}
          </div>
        </div>
        <div className="flex col-span-1 h-full grid grid-rows-12 bg-gray-300 p-4">
          <Button variant="destructive" size="lg" className="flex justify-center row-span-2 items-center">
            Pending  
          </Button> 
          <div className="flex justify-center text-center row-span-9 items-center border-4 border-gray-600">
            chat component placeholder
          </div>
        </div>
      </main>

  );
}
