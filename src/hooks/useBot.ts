import { BotAPI } from './../api/bot';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useSendMessage = (chatId: number) => {
    const queryClient = useQueryClient();
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