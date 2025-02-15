import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTeleparty } from '../context/TelepartyContext';
import { SocketMessageTypes } from 'teleparty-websocket-lib';

const ChatWindow: React.FC = () => {
    const { roomId } = useParams<{ roomId: string }>();
    const { messages, sendMessage } = useTeleparty();
    const [newMessage, setNewMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!roomId || !newMessage.trim()) return;

        try {
            await sendMessage(roomId, SocketMessageTypes.SEND_MESSAGE, newMessage.trim());
            setNewMessage('');
        } catch (error) {
            alert('Failed to send message: ' + error);
        }
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                    <div key={message.permId} className="flex flex-col">
                        <div className="flex items-baseline space-x-2">
                            <span className="font-semibold">{message.userNickname}</span>
                            <span className="text-xs text-gray-500">
                                {new Date(message.timestamp).toLocaleTimeString()}
                            </span>
                        </div>
                        <p className="mt-1 text-gray-700">{message.body}</p>
                    </div>
                ))}
            </div>

            <form onSubmit={handleSubmit} className="border-t p-4">
                <div className="flex space-x-2">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        disabled={!newMessage.trim()}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Send
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ChatWindow;