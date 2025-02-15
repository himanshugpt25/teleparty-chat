import React, { useState } from 'react';

interface JoinRoomModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (nickname: string, roomId: string) => void;
}

const JoinRoomModal: React.FC<JoinRoomModalProps> = ({ isOpen, onClose, onSubmit }) => {
    const [nickname, setNickname] = useState('');
    const [roomId, setRoomId] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (nickname.trim() && roomId.trim()) {
            onSubmit(nickname.trim(), roomId.trim());
            setNickname('');
            setRoomId('');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-96">
                <h2 className="text-xl font-semibold mb-4">Join Room</h2>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="nickname" className="block text-sm font-medium text-gray-700 mb-1">
                                Your Nickname
                            </label>
                            <input
                                id="nickname"
                                type="text"
                                value={nickname}
                                onChange={(e) => setNickname(e.target.value)}
                                placeholder="Enter your nickname"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                autoFocus
                            />
                        </div>
                        <div>
                            <label htmlFor="roomId" className="block text-sm font-medium text-gray-700 mb-1">
                                Room ID
                            </label>
                            <input
                                id="roomId"
                                type="text"
                                value={roomId}
                                onChange={(e) => setRoomId(e.target.value)}
                                placeholder="Enter room ID"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                    <div className="mt-6 flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 hover:text-gray-800"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                            disabled={!nickname.trim() || !roomId.trim()}
                        >
                            Join Room
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default JoinRoomModal; 