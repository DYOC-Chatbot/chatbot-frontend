'use client'

import React, { useEffect, useRef, useState } from 'react'
import ChatBoxForm, { formSchema } from './ChatBoxForm';
import ChatMessage from './ChatMessage';
import { useChat } from '@/hooks/useChat';
import { useSendMessage } from '@/hooks/useBot';
import { ByUser, Message } from '@/types/messages/message';
import { getMessagesFromChat } from '@/lib/chat';
import { getMessageWebsocketUrl } from '@/constants/global';
import { z } from 'zod';
import { useWebsocket } from '@/hooks/useWebsocket';

type P = {
  // ID of the chat to retrieve history of messages from. Not the TG Chat ID, but the actual chat Id stored in database
  chatId: number;
}

export default function ChatBox({chatId}: P) {
  const {data: chat, isPending} = useChat(chatId);
  const sendMessageMutation = useSendMessage(chatId)

  const [messages, setMessages] = useState<Message[]>([])
  const bottomRef = useRef<any>(null);
  
  useWebsocket(getMessageWebsocketUrl(), setMessages)

  useEffect(() => {
    if (chat) {
      setMessages(getMessagesFromChat(chat));
    }
  }, [chat])

  // Auto-scrol to bottom of chat upon new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages])

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await sendMessageMutation.mutate(values.text);
    setMessages([...messages, {
      messageBody: values.text,
      by: ByUser.STAFF,
      telegramMessageId: 0,
      timestamp: new Date(),
    }])

  }

  return (
    <div>
      <div className='flex flex-col max-h-[480px] overflow-auto'>
          {messages.map((message, index) => (
            <ChatMessage 
              key={index}
              message={message.messageBody} 
              isSender={message.by === ByUser.BOT || message.by === ByUser.STAFF} />
          ))}
          <div ref={bottomRef} />
      </div>
      <ChatBoxForm onSubmit={onSubmit} />
    </div>
  )
}
