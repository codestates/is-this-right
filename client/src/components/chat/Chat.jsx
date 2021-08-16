import React, { useState, useEffect } from 'react';
import MessageContainer from './MessageContainer';
import Input from './Input';
import './styles/Chat.css';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { updateChatList } from '../../actions/chatAction';

const url = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;
const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const state = useSelector((state) => state.userReducer);
  const chatState = useSelector((state) => state.chatReducer);
  const dispatch = useDispatch();

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      chatState.socket.emit('sendMessage', {
        message,
        sender: state.userInfo.data.id,
        room: chatState.currentRoom,
      });
      setMessage('');
      // socket.emit('online', { socketId })
      //
    }
  };

  //방 번호가 바뀔때마다 해당 방 메세지 받아오기
  useEffect(async () => {
    if (chatState.currentRoom) {
      let list = await axios.get(`${url}/chats/messages/${chatState.currentRoom}`);
      console.log('왜안나오니채팅친구야', list);
      setMessages(list.data.data);
    }
  }, [chatState.currentRoom, chatState.socket]);

  // 페이지가 로딩되었을때 소켓 io 대기상태 만들기 .
  useEffect(() => {
    if (chatState.socket) {
      chatState.socket.on('message', async (message) => {
        console.log(message.username, '님으로 부터 메세지가 도착했어요: ', message.message);
        console.log(
          'message.chatId: ',
          message.chatId,
          ', chatState.currentRoom: ',
          chatState.currentRoom,
          '둘이 같냐',
          message.chatId === chatState.currentRoom,
        );
        if (message.chatId === chatState.currentRoom) {
          await axios.patch(`${url}/chats/${chatState.currentRoom}`);
          setMessages((messages) => [...messages, message]);
        }
        let chatlist = await axios.get(`${url}/chats`);
        dispatch(updateChatList(chatlist.data.data));
      });
    }
  }, [chatState.socket]);

  return (
    <div className="outerContainer">
      <div className="container">
        <MessageContainer messages={messages} />
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
    </div>
  );
};

export default Chat;
