import React, { useState } from 'react'
import ChatBoxForm from './ChatBoxForm';
import ChatMessage from './ChatMessage';

type P = {
  chatId: string; // ID of the chat to retrieve history of messages from
}

export default function ChatBox() {

  const [messages, setMessages] = useState(
    [
      {
        message: "Hello",
        isSender: false
      },
      {
        message: "Hi",
        isSender: true
      }
    ]
  )

  const onSubmit = async (values: any) => {
    console.log(values)
    setMessages([...messages, { message: values.text, isSender: true }])

  }

  return (
    <div className='flex flex-col'>
      {messages.map((message, index) => (
        <ChatMessage 
          key={index} 
          message={message.message} 
          isSender={message.isSender} />
      ))}
      <ChatBoxForm onSubmit={onSubmit} />
    </div>
  )
}
