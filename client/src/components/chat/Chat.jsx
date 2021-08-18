import React, { useState, useEffect } from 'react';
import MessageContainer from './MessageContainer';
import Input from './Input';
import './styles/Chat.css';
import axios from 'axios';
import { useSelector } from 'react-redux';

const url = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;
const Chat = () => {
  const [message, setMessage] = useState('');
  const state = useSelector((state) => state.userReducer);
  const chatState = useSelector((state) => state.chatReducer);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      chatState.socket.emit('sendMessage', {
        message,
        sender: state.userInfo.id,
        room: chatState.currentRoom,
      });
      setMessage('');
      // socket.emit('online', { socketId })
      //
    }
  };

  return (
    <div className="outerContainer">
      <div className="container">
        <MessageContainer />
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
    </div>
  );
};

export default Chat;
