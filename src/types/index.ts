export interface User {
    id: string;
    name: string;
    avatar?: string;
  }
  
  export interface Room {
    id: string;
    name: string;
    createdBy: string;
    createdAt: Date;
    participants: User[];
  }
  
  export interface Message {
    id: string;
    content: string;
    sender: User;
    roomId: string;
    timestamp: Date;
  }