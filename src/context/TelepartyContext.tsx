import React, { createContext, useContext, ReactNode, useState, useCallback } from 'react';
import { TelepartyClient, SocketEventHandler, SocketMessageTypes, SessionChatMessage } from 'teleparty-websocket-lib';



interface TelepartyContextType {
    client: TelepartyClient;
    messages: SessionChatMessage[];
    sendMessage: (roomId: string, type: SocketMessageTypes, content: string) => Promise<void>;
    currentSession: string | null;
    setCurrentSession: (sessionId: string | null) => void;
    loadMessages: (messages: SessionChatMessage[]) => void;
}

const TelepartyContext = createContext<TelepartyContextType | undefined>(undefined);

export function TelepartyProvider({ children }: { children: ReactNode }) {
    const [messages, setMessages] = useState<SessionChatMessage[]>([]);
    const [currentSession, setCurrentSession] = useState<string | null>(null);
    
    const handleNewMessage = useCallback((message: any) => {
        if (message.type === SocketMessageTypes.SEND_MESSAGE) {
            setMessages(prevMessages => {
                return [...prevMessages, message];
            });
        }
    }, []);

    const loadMessages = useCallback(async (messages: SessionChatMessage[]) => {
        setMessages(messages);
    }, []);

    const eventHandler: SocketEventHandler = {
        onConnectionReady: () => { console.log("Connection established") },
        onClose: () => { 
            console.log("Connection closed");
            setCurrentSession(null);
        },
        onMessage: handleNewMessage
    };

    const client = new TelepartyClient(eventHandler);

    const sendMessage = async (roomId: string, type: SocketMessageTypes, content: string) => {
        if (!currentSession) {
            throw new Error("You are not in a session. Please join or create a room first.");
        }

        try {
            await client.sendMessage(type, {
                type: SocketMessageTypes.SEND_MESSAGE,
                roomId,
                body: content,
                sessionId: currentSession,
                timestamp: new Date().toISOString()
            });
        } catch (error) {
            console.error('Failed to send message:', error);
            throw error;
        }
    };

    return (
        <TelepartyContext.Provider value={{ 
            client,
            messages,
            sendMessage,
            currentSession,
            setCurrentSession,
            loadMessages
        }}>
            {children}
        </TelepartyContext.Provider>
    );
}

export function useTeleparty() {
    const context = useContext(TelepartyContext);
    if (context === undefined) {
        throw new Error('useTeleparty must be used within a TelepartyProvider');
    }
    return context;
} 