import { Message } from "../messages/message";
import { RequestQuery } from "./requestquery";

export type Chat = {
    id: number;
    telegramChatId: string;
    requestQueries: RequestQuery[];
    messages: Message[]
}