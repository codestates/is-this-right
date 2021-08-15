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
        ? chatlist.map((list2) => {
            return (
              <div key={list2.chatId}>
                <span>{list2.chatId}번 방.</span>
                <span>{list2.username}</span>
                <span>{list2.lastMessage}</span>
                <span>{list2.unreadMessageCount}</span>
                <button onClick={() => handleChatRoom(list2.chatId)}>클릭</button>
              </div>
            );
          })
        : null}
    </>
  );
};

export default ChatRoom;
