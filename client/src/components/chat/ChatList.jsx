import React from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { changeRoom, setViewChatlist } from '../../actions/chatAction';
const url = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

const ChatList = () => {
  const chatState = useSelector((state) => state.chatReducer);
  const dispatch = useDispatch();

  //방 번호가 바뀔때마다 해당 방 메세지 받아오기

  const handleChatRoom = (chatId) => {
    dispatch(changeRoom(chatId));
    chatState.socket.emit('join', { room: chatId });
    dispatch(setViewChatlist(false));
  };

  return (
    <>
      {chatState.chatList.map((chat) => {
        return (
          <div key={chat.chatId}>
            <span>{chat.chatId}번 방.</span>
            <span>{chat.username}</span>
            <span>{chat.lastMessage}</span>
            <span>{chat.unreadMessageCount}</span>
            <button onClick={() => handleChatRoom(chat.chatId)}>클릭</button>
          </div>
        );
      })}
    </>
  );
};

export default ChatList;
