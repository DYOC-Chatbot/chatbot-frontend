import React from 'react'

type P = {
    message: string;
    isSender: boolean; // Determines if the message should appear on the left or right. Sender = right, else = left
}

export default function ChatMessage({message, isSender}: P) {
  return (
    <div className={`flex ${isSender ? "justify-end": "justify-start"}`}>
      <p className={`border inline-block py-1 px-2 rounded ${isSender ? "bg-green-500 text-white" : "bg-gray-100"}`}>
        {message}
      </p>
    </div>
  )
}
