import { ChatAPI } from "@/api/chat"
import { useQuery } from "@tanstack/react-query"

const useChats = () => {
    return useQuery({
        queryKey: ["chat"],
        queryFn: () => ChatAPI.getAll()
    })
}

const useChat = (id: number) => {
    return useQuery({
        enabled: Boolean(id),
        queryKey: ["chat", id],
        queryFn: () => ChatAPI.getOne(id)
    })
}

export {
    useChat,
    useChats,
}