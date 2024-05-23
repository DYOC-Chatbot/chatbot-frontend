import React from 'react'


type P = {
    message: string;
    isSender: boolean; // Determines if the message should appear on the left or right. Sender = right, else = left
}
export default function ChatMessage({message, isSender}: P) {
  return (
    <div className={`flex ${isSender ? "justify-end": "justify-start"}`}>
        {message}
    </div>
  )
}
