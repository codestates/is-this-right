import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
const url = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

const ChatRoom = ({ changeRoom, handleSetisChat }) => {
  const [chatlist, setChatList] = useState([]);
  const [viewChatist, setViewChatlist] = useState(false);

  useEffect(() => {
    axios.get(`${url}/chats`).then((data) => {
      console.log('쳇데이터', data);
      setChatList(data.data.data);
      setViewChatlist();
    });
  }, []);

  const handleViewChatList = () => {
    setViewChatlist(!viewChatist);
  };
  const handleChatRoom = (chatId) => {
    changeRoom(chatId);
    handleSetisChat();
  };

  return (
    <>
      <button onClick={handleViewChatList}>채팅 목록보기</button>
      {viewChatist
        ? chatlist.map((chat) => {
            return (
              <div key={chat.chatId}>
                <span>{chat.chatId}번 방.</span>
                <span>{chat.username}</span>
                <span>{chat.lastMessage}</span>
                <span>{chat.unreadMessageCount}</span>
                <button onClick={() => handleChatRoom(chat.chatId)}>클릭</button>
              </div>
            );
          })
        : null}
    </>
  );
};

export default ChatRoom;
