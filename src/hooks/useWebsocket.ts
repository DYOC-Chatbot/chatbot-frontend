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
        
            socket.onclose = (event) => {
                var reason;
                alert(event.code);
                // See https://www.rfc-editor.org/rfc/rfc6455#section-7.4.1
                if (event.code == 1000)
                    reason = "Normal closure, meaning that the purpose for which the connection was established has been fulfilled.";
                else if(event.code == 1001)
                    reason = "An endpoint is \"going away\", such as a server going down or a browser having navigated away from a page.";
                else if(event.code == 1002)
                    reason = "An endpoint is terminating the connection due to a protocol error";
                else if(event.code == 1003)
                    reason = "An endpoint is terminating the connection because it has received a type of data it cannot accept (e.g., an endpoint that understands only text data MAY send this if it receives a binary message).";
                else if(event.code == 1004)
                    reason = "Reserved. The specific meaning might be defined in the future.";
                else if(event.code == 1005)
                    reason = "No status code was actually present.";
                else if(event.code == 1006)
                reason = "The connection was closed abnormally, e.g., without sending or receiving a Close control frame";
                else if(event.code == 1007)
                    reason = "An endpoint is terminating the connection because it has received data within a message that was not consistent with the type of the message (e.g., non-UTF-8 [https://www.rfc-editor.org/rfc/rfc3629] data within a text message).";
                else if(event.code == 1008)
                    reason = "An endpoint is terminating the connection because it has received a message that \"violates its policy\". This reason is given either if there is no other sutible reason, or if there is a need to hide specific details about the policy.";
                else if(event.code == 1009)
                reason = "An endpoint is terminating the connection because it has received a message that is too big for it to process.";
                else if(event.code == 1010) // Note that this status code is not used by the server, because it can fail the WebSocket handshake instead.
                    reason = "An endpoint (client) is terminating the connection because it has expected the server to negotiate one or more extension, but the server didn't return them in the response message of the WebSocket handshake. <br /> Specifically, the extensions that are needed are: " + event.reason;
                else if(event.code == 1011)
                    reason = "A server is terminating the connection because it encountered an unexpected condition that prevented it from fulfilling the request.";
                else if(event.code == 1015)
                    reason = "The connection was closed due to a failure to perform a TLS handshake (e.g., the server certificate can't be verified).";
                else
                    reason = "Unknown reason";
                
              console.debug(`WebSocket connection closed. ${reason}`);
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