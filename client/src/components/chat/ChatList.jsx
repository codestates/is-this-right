import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { changeRoom, updateChatList, setMessages, addMessage } from '../../actions/chatAction';
import { message } from 'antd';
const url = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

const ChatList = ({ handleSetisChat }) => {
  const [viewChatist, setViewChatlist] = useState(false);
  const chatState = useSelector((state) => state.chatReducer);
  const dispatch = useDispatch();

  const markAsRead = async (chatId) => {
    return axios.patch(`${url}/chats/${chatId}`);
  };

  useEffect(async () => {
    if (chatState.socket) {
      let chatList = await axios.get(`${url}/chats`);
      chatList = chatList.data.data;
      dispatch(updateChatList(chatList));
      setViewChatlist();
    }
  }, [chatState.socket]);

  //방 번호가 바뀔때마다 해당 방 메세지 받아오기
  useEffect(async () => {
    if (chatState.currentRoom) {
      let list = await axios.get(`${url}/chats/messages/${chatState.currentRoom}`);
      dispatch(setMessages(list.data.data));
      let chatlist = await axios.get(`${url}/chats`);
      dispatch(updateChatList(chatlist.data.data));
    }
  }, [chatState.currentRoom]);

  useEffect(() => {
    if (chatState.socket) {
      chatState.socket.on('message', async (message) => {
        markAsRead(message.chatId).then(async () => {
          dispatch(addMessage(message));
          let chatlist = await axios.get(`${url}/chats`);
          dispatch(updateChatList(chatlist.data.data));
        });
      });
    }
  }, [chatState.socket]);
  const handleViewChatList = () => {
    setViewChatlist(!viewChatist);
  };

  const handleChatRoom = (chatId) => {
    dispatch(changeRoom(chatId));
    chatState.socket.emit('join', { room: chatId });
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
