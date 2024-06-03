import { Chat } from "@/types/chats/chat";
import { Message } from "@/types/messages/message";

/**
 * Iterates through all requestQueries in a chat object and pushes all messages in each requestQuery
 * into an array of messages.
 */
export function getMessagesFromChat(chat: Chat): Message[] {
    const messages = [];
    for (const requestQuery of chat.requestQueries) {
        messages.push(...requestQuery.messages);
    }
    return messages;
}