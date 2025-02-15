import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Room } from '../types';
import { useTeleparty } from '../context/TelepartyContext';
import NicknameModal from './NicknameModal';
import JoinRoomModal from './JoinRoomModal';

interface RoomResponse {
    roomId: string;
    sessionId: string;
}

const Sidebar: React.FC = () => {
  const { client, setCurrentSession, loadMessages } = useTeleparty();
  const [rooms, setRooms] = React.useState<Room[]>([]);
  const navigate = useNavigate();
  const [isNicknameModalOpen, setIsNicknameModalOpen] = useState(false);
  const [isJoinRoomModalOpen, setIsJoinRoomModalOpen] = useState(false);

  const handleCreateRoom = async (nickname: string) => {
    const userIcon = "default-icon"; // You can customize this
    try {
      const roomData = await client.createChatRoom(nickname, userIcon);
      // Extract roomId and sessionId from the response
      const roomId = roomData
      const sessionId = roomData
      
      setCurrentSession(sessionId);
      
      const newRoom: Room = {
        id: roomId,
        name: `${nickname}'s Room`,
        createdBy: nickname,
        createdAt: new Date(),
        participants: [{ id: nickname, name: nickname }]
      };
      setRooms([...rooms, newRoom]);
      setIsNicknameModalOpen(false);
      navigate(`/chat/${roomId}`);
    } catch (error) {
      alert("Failed to create room: " + error);
    }
  };

  const handleJoinRoom = async (nickname: string, roomId: string) => {
    const userIcon = "default-icon"; // You can customize this
    try {
      const response = await client.joinChatRoom(nickname,roomId,userIcon);
      // Extract sessionId from the response, assuming it's either in the response object or the response itself is the sessionId
      // const sessionId = typeof response === 'string' ? response : response.sessionId;
      console.log("join room response - ",response);
      loadMessages(response.messages);
      // setCurrentSession(sessionId);
      setIsJoinRoomModalOpen(false);
      navigate(`/chat/${roomId}`);
    } catch (error) {
      alert("Failed to join room: " + error);
    }
  };

  return (
    <div className="w-64 bg-white h-full border-r">
      <div className="p-4">
        <div className="space-y-2">
          <button
            onClick={() => setIsNicknameModalOpen(true)}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Create Room
          </button>
          <button
            onClick={() => setIsJoinRoomModalOpen(true)}
            className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Join Room
          </button>
        </div>
      </div>
      
      <div className="mt-4">
        <h2 className="px-4 text-lg font-semibold text-gray-600">Your Rooms</h2>
        <div className="mt-2">
          {rooms.map((room) => (
            <Link
              key={room.id}
              to={`/chat/${room.id}`}
              className="block px-4 py-2 hover:bg-gray-100"
            >
              {room.name}
            </Link>
          ))}
        </div>
      </div>

      <NicknameModal
        isOpen={isNicknameModalOpen}
        onClose={() => setIsNicknameModalOpen(false)}
        onSubmit={handleCreateRoom}
      />

      <JoinRoomModal
        isOpen={isJoinRoomModalOpen}
        onClose={() => setIsJoinRoomModalOpen(false)}
        onSubmit={handleJoinRoom}
      />
    </div>
  );
};

export default Sidebar;