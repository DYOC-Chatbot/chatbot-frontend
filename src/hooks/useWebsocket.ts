import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from "react";

const RECONNECT_INTERVAL = 5000 // reconned interval in ms
const MAX_RECONNECT_ATTEMPTS = 5 // maximum times to attempt reconnection
export function useWebsocket(url: string, setItems: Dispatch<SetStateAction<any[]>>) {
    // We use refs here because reconnections do not trigger re-renders, which means state values would 
    // remain unchanged. We use refs to keep track of the number of reconnection attempts
    const reconnectAttempts = useRef<number>(0);
    const wsRef = useRef<WebSocket | null>(null)

    const connect = useCallback(() => {
        try {
            if (wsRef.current) {
                console.info("Websocket connection already exists")
                return
            }
            const socket = new WebSocket(url);
            
            socket.onopen = () => {
              console.info('WebSocket connection established');
              reconnectAttempts.current = 0;

            };
      
            // TODO: Implement filtering by chat id since currently, this receives ALL messages from ALL users of the chatbot
            socket.onmessage = (event) => {
              setItems((prev) => [
                ...prev,
                JSON.parse(event.data).data,
              ]);
              console.info('Message from server: ', event.data);
            };
        
            socket.onclose = (ev) => {
              console.debug('WebSocket connection closed', ev);
              reconnect();
            };
        
            socket.onerror = (ev) => {
                console.error('WebSocket error event: ', ev);
                // Note: There's a bug with calling close() in this function, where the connection
                // remains unopenable. So don't call close() here
            };

            wsRef.current = socket;

            return () => {
              close()
            };
          } catch (error) {
            console.error(error)
          }
    }, [url, setItems])

    // End websocket connection
    const close = useCallback(() => {
        if (wsRef.current) {
            wsRef.current.close()
            wsRef.current = null;
        }
    }, [])

    const reconnect = useCallback(() => {
        if (reconnectAttempts.current < MAX_RECONNECT_ATTEMPTS && !wsRef.current?.OPEN) {
            // Note: there may be a bug where timeout is not cleared when the component is unmounted or reconnection attempts "stop"
            // but this might be at most a minor bug, at least for now
            setTimeout(() => {
                try {
                    console.info(`Reconnecting in ${RECONNECT_INTERVAL} ms...`);
                    reconnectAttempts.current += 1
                    console.log('Reconnect attempts: ', reconnectAttempts)
                    close()
                    connect()
                } catch (ex) {
                    console.error('Error while reconnecting: ', ex)
                }
            }, RECONNECT_INTERVAL)
        } else {
            console.info('Max reconnection attempts reached or websocket connection is already established. Stopping reconnection attempts...')

        }
    }, [close, connect])

    useEffect(() => {
        connect()
        return () => {
            close();
        }
    }, [connect, close])
  
    return
}