import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

import Messages from './Messages/Messages';
import Input from './Input/Input';

import './Chat.css';
import axios from 'axios';

const Chat = ({ name, room, socket }) => {
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit('sendMessage', { message, room }, () => setMessage(''));
    }
  };
  useEffect(async () => {
    let list = await axios.get('http://localhost:80/chats/messages', {
      withCredentials: true,
    });
    setMessages(list.data);
    socket.emit('join', { room });
  }, [room]);
  useEffect(() => {
    socket.on('message', (message, af) => {
      console.log('클라 메세지 받기', message);

      setMessages((messages) => [...messages, message]);
    });
  }, []);

  return (
    <div className="outerContainer">
      <div className="container">
        <Messages messages={messages} name={'상현'} />
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
    </div>
  );
};

export default Chat;
