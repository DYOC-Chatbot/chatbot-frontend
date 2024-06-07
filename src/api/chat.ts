import axios from "axios";
import { API, BaseAPI } from "./base";
import { Chat } from "@/types/chats/chat";
import { RequestQuery } from "@/types/chats/requestquery";

export class ChatAPI extends BaseAPI {
    static async getAll(): Promise<Chat[]> {
        const res = await super.get(`${API}/chats`);
        return res.data.data.items;
    }

    static async getAllRequestQueries(): Promise<RequestQuery[]> {
        const res = await super.get(`${API}/chats`);
        const chats: Chat[] = res.data.data.items;

        const requestQueries: RequestQuery[] = [];
        chats.forEach(chat => {
            requestQueries.push(...chat.requestQueries);
        });

        return requestQueries;
    }

    static async getAllPendingRequestQuery(): Promise<RequestQuery[]> {
        const res = await super.get(`${API}/chats`);
        const chats: Chat[] = res.data.data.items;

        const pendingRequestQueries: RequestQuery[] = [];
        chats.forEach(chat => {
            const pendingRequestQueriesForOne = chat.requestQueries.filter(rq => rq.status === "pending");
            pendingRequestQueries.push(...pendingRequestQueriesForOne);
        });

        return pendingRequestQueries;
    }

    static async getAllWaitingforReview(): Promise<RequestQuery[]> {
        const res = await super.get(`${API}/chats`);
        const chats: Chat[] = res.data.data.items;

        const waitingForReviewRequestQueries: RequestQuery[] = [];
        chats.forEach(chat => {
            const waitingForReviewRequestQueriesForOne = chat.requestQueries.filter(rq => rq.status === "closed");
            waitingForReviewRequestQueries.push(...waitingForReviewRequestQueriesForOne);
        });

        return waitingForReviewRequestQueries;
    }

    static async getOne(chatId: number): Promise<Chat> {
        const res = await super.get(`${API}/chats/${chatId}`);
        return res.data.data;
    }

    static async create(chat: Chat): Promise<Chat> {
        const res = await super.post(`${API}/chats`, chat);
        return res.data.data;
    }
}
