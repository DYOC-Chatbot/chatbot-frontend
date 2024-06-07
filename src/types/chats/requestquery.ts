import { Message } from "../messages/message";

export enum Status {
	ONGOING = "ongoing",
	AUTOREPLY = "autoreply",
	PENDING = "pending",
	CLOSED = "closed",
	REVIEWED = "reviewed"
}

export enum Type {
	UNKNOWN = "unknown",
	QUERY = "query",
	REQUEST = "request"
}

export type RequestQuery = {
    id: number;
    chatId: number;
    status: Status;
    type: Type;
    timestamp: Date;
    messages: Message[]
    // TODO: Add booking reference
}