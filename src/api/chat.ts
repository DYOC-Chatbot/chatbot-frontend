import axios from "axios";
import { API, BaseAPI } from "./base";
import { Chat } from "@/types/chats/chat";

export class ChatAPI extends BaseAPI {
    static async getAll(): Promise<Chat[]> {
        const res = await super.get(`${API}/chats`);
        
        return res.data;
    }
    
    static async getOne(chatId: number): Promise<Chat> {
        const res = await super.get(`${API}/chats/${chatId}`);
        
        return res.data;
    }
}