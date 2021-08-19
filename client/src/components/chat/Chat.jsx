import React, { useState, useEffect } from 'react';
import MessageContainer from './MessageContainer';
import Input from './Input';
import './styles/Chat.css';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import ChatList from './ChatList';
import InfoBar from './InfoBar';
import { updateChatList, setMessages } from '../../actions/chatAction';
const url = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;
const Chat = () => {
  const [message, setMessage] = useState('');
  const state = useSelector((state) => state.userReducer);
  const chatState = useSelector((state) => state.chatReducer);
  const dispatch = useDispatch();

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      console.log('여기서 여러번 보내나? sendMessage Emit'); //한번만 되는중
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
  useEffect(async () => {
    if (chatState.currentRoom) {
      let list = await axios.get(`${url}/chats/messages/${chatState.currentRoom}`);
      dispatch(setMessages(list.data.data));
      let chatlist = await axios.get(`${url}/chats`);
      dispatch(updateChatList(chatlist.data.data));
    }
  }, [chatState.currentRoom]);
  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar />
        {chatState.viewChatlist ? (
          <ChatList />
        ) : (
          <>
            <MessageContainer />
            <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
          </>
        )}
      </div>
    </div>
  );
};

export default Chat;
