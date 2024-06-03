import { BotAPI } from './../api/bot';
import { QueryClient, useMutation } from '@tanstack/react-query';

const useSendMessage = (chatId: number) => {
    const queryClient = new QueryClient();
    return useMutation({
        mutationFn: (message: string) => BotAPI.sendMessage(chatId, message),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['chat', chatId]
            });
        }
    })
}

export {
    useSendMessage
}