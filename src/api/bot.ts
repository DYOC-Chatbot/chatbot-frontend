import { API, BaseAPI } from "./base";

export class BotAPI extends BaseAPI {
    static async sendMessage(chatId: number, message: string) {
        // This only retursn the success message, so we don't care about the return result
        const res = await super.post(`${API}/bot/send/${chatId}`, {message})
        return;
    }
}