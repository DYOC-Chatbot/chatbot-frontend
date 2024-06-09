import React, { useEffect, useState } from 'react'
import ChatBoxForm from './ChatBoxForm';
import ChatMessage from './ChatMessage';
import { useChat } from '@/hooks/useChat';
import { useSendMessage } from '@/hooks/useBot';
import { ByUser, Message } from '@/types/messages/message';
import { getMessagesFromChat } from '@/lib/chat';
import { MESSAGE_WS_API_URL } from '@/constants/global';

type P = {
  // ID of the chat to retrieve history of messages from. Not the TG Chat ID, but the actual chat Id stored in database
  chatId: number;
}

export default function ChatBox({chatId}: P) {
  const {data: chat, isPending} = useChat(chatId);
  const sendMessageMutation = useSendMessage(chatId)

  const [messages, setMessages] = useState<Message[]>([])
  
  useEffect(() => {
    if (chat) {
      setMessages(getMessagesFromChat(chat));
    }

  }, [chat])
  
  useEffect(() => {
    try {
      // TODO: Replace URL with constant string
      const socket = new WebSocket(MESSAGE_WS_API_URL());
  
      socket.onopen = () => {
        console.log('WebSocket connection established');
      };
  
      socket.onmessage = (event) => {
        setMessages((prevMessages) => [...prevMessages, event.data])
        console.log('Message from server: ', event.data);
      };
  
      socket.onclose = () => {
        console.log('WebSocket connection closed');
      };
  
      socket.onerror = (ev) => {
        console.error('error event: ', ev);
      };
      return () => {
        socket.close();
      };
    } catch (error) {
      console.error(error)
    }

  }, [])

  const onSubmit = async (values: any) => {
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
      </div>
      <ChatBoxForm onSubmit={onSubmit} />
    </div>
  )
}
