import React, { useState } from 'react'
import ChatBoxForm from './ChatBoxForm';
import ChatMessage from './ChatMessage';
import { useChat } from '@/hooks/useChat';
import { ByUser, Message } from '@/types/messages/message';

type P = {
  // ID of the chat to retrieve history of messages from. Not the TG Chat ID, but the actual chat Id stored in database
  chatId: number;
}

export default function ChatBox({chatId}: P) {
  const {data: chat, isPending} = useChat(chatId);

  const [messages, setMessages] = useState<Message[]>(chat?.messages || [])

  const onSubmit = async (values: any) => {
    setMessages([...messages, {
      messageBody: values.text,
      by: ByUser.STAFF,
      telegramMessageId: 0,
      timestamp: new Date(),
    }])

  }

  return (
    <div className='flex flex-col'>
      {messages.map((message, index) => (
        <ChatMessage 
          key={index}
          message={message.messageBody} 
          isSender={message.by === ByUser.BOT || message.by === ByUser.STAFF} />
      ))}
      <ChatBoxForm onSubmit={onSubmit} />
    </div>
  )
}
