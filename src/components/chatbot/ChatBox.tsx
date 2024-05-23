import React from 'react'
import ChatBoxForm from './ChatBoxForm';

type P = {
  chatId: string; // ID of the chat to retrieve history of messages from
}



export default function ChatBox() {
  return (
    <div>
      <ChatBoxForm />
    </div>
  )
}
