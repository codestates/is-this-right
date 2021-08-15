import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Messages from './Messages/Messages';
import Input from './Input/Input';
import './Chat.css';
import axios from 'axios';
import { useSelector } from 'react-redux';
const url = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

const Chat = ({ name, roomNum, socket }) => {
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const state = useSelector((state) => state.userReducer);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit('sendMessage', { message, name, sender: state.userInfo.data.id, room: roomNum });
      setMessage('');

      // socket.emit('online', { socketId })
      //
    }
  };

  //방 번호가 바뀔때마다 해당 방 메세지 받아오기
  useEffect(() => {
    if (roomNum) {
      let getChatdata = async () => {
        let list = await axios.get(`${url}/chats/messages/${roomNum}`);
        console.log('왜안나오니채팅친구야', list);

        setMessages(list.data.data);
      };
      getChatdata();
      console.log(name);
      socket.emit('join', { room: roomNum });
    }
  }, [roomNum, socket]);

  // 페이지가 로딩되었을때 소켓 io 대기상태 만들기 .
  useEffect(() => {
    if (socket) {
      socket.on('message', (message, af) => {
        console.log('클라 메세지 받기', message);
        setMessages((messages) => [...messages, message]);
      });
    }
  }, [socket]);

  return (
    <div className="outerContainer">
      <div className="container">
        <Messages messages={messages} name={name} />
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
    </div>
  );
};

export default Chat;
