import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { changeRoom, updateChatList } from '../../actions/chatAction';
const url = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

const ChatList = ({ handleSetisChat }) => {
  const [viewChatist, setViewChatlist] = useState(false);
  const chatState = useSelector((state) => state.chatReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (chatState.socket) {
      axios.get(`${url}/chats`).then((data) => {
        console.log('쳇데이터', data);
        const chatList = data.data.data;
        dispatch(updateChatList(chatList));
        chatList.forEach((chat) => {
          console.log('방입장중...', chat.chatId);
          chatState.socket.emit('join', { room: chat.chatId });
        });
        setViewChatlist();
      });
    }
  }, [chatState.socket]);

  const handleViewChatList = () => {
    setViewChatlist(!viewChatist);
  };
  const handleChatRoom = (chatId) => {
    dispatch(changeRoom(chatId));
    console.log('지금', chatState.currentRoom, '방인데요');
    handleSetisChat();
  };

  return (
    <>
      <button onClick={handleViewChatList}>채팅 목록보기</button>
      {viewChatist
        ? chatState.chatList.map((chat) => {
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

export default ChatList;
