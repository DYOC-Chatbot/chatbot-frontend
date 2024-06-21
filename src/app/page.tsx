import ChatBox from "@/components/chatbot/ChatBox";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <ChatBox chatId={1} />
    </main>
  );
}
