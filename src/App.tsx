import './App.css';

import React, { JSX } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import ChatWindow from './components/ChatWindow';
import { TelepartyProvider } from './context/TelepartyContext';

function App(): JSX.Element {
  return (
    <TelepartyProvider>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<div className="h-full flex items-center justify-center text-gray-500">Select a room or create one to start chatting</div>} />
            <Route path="chat/:roomId" element={<ChatWindow />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TelepartyProvider>
  );
}

export default App;