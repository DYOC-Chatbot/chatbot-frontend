export const MESSAGE_WS_API_URL = () => {
    const url = new URL(process.env.NEXT_PUBLIC_BACKEND_URL!);
    // host = localhost:8080
    // pathname = /api
    const wsUrl = `ws://${url.host}${url.pathname}/ws`;
    return wsUrl;
}