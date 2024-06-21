export enum ByUser {
    BOT = "bot",
    GUEST = "guest",
    STAFF = "staff"
}

export type Message = {
    telegramMessageId: number;
    by: ByUser;
    messageBody: string;
    timestamp: Date;
    hotelStaffId?: number;
}