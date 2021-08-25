import React, { useState, useEffect } from 'react';
import MessageContainer from './MessageContainer';
import Input from './Input';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import ChatList from './ChatList';
import InfoBar from './InfoBar';
import styled from 'styled-components';
import { updateChatList, setMessages, setNewMessages } from '../../actions/chatAction';
const url = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

const OuterContainer = styled.div`
  height: 600px;
  width: 400px;
  position: fixed;
  bottom: 5vh;
  right: 5vw;
  z-index: 980;
  border-radius: 4px;

  @media ${(props) => props.theme.mobile} {
    height: 100vh;
    width: 100vw;
    right: 0;
    bottom: 0;
    z-index: 990;
    border-radius: 0 0 0 0;
    overflow-x: hidden;
    -ms-overflow-style: none;
    ::-webkit-scrollbar {
      display: none;
    }
  }
  .infobar {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 70px;
    @media ${(props) => props.theme.mobile} {
      position: fixed;
      top: 0;
    }
  }
  .chatlist {
    width: 100%;
    height: 100%;
    @media ${(props) => props.theme.mobile} {
      position: absolute;
    }
  }
  .chatContainer {
    overflow-x: hidden;
    position: relative;
    background: #fff;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    border-radius: 4px;
    box-shadow: 0 0 5px rgba(3, 4, 94, 0.3);

    @media ${(props) => props.theme.mobile} {
      border-radius: 0 0 0 0;
    }
  }
`;

const Chat = () => {
  const [message, setMessage] = useState('');
  const state = useSelector((state) => state.userReducer);
  const chatState = useSelector((state) => state.chatReducer);
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');

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

  useEffect(async () => {
    if (chatState.currentRoom) {
      let list = await axios.get(`${url}/chats/messages/${chatState.currentRoom}`);
      dispatch(setMessages(list.data.data));
      let chatlist = await axios.get(`${url}/chats`);
      chatlist = chatlist.data.data;
      dispatch(updateChatList(chatlist));
      dispatch(setNewMessages(chatlist.reduce((acc, cur) => acc + cur.unreadMessageCount, 0)));
    }
  }, [chatState.currentRoom]);
  return (
    <OuterContainer>
      <div className="chatContainer">
        {chatState.viewChatlist ? null : (
          <>
            <MessageContainer />
            <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
          </>
        )}
      </div>
      <div className="infobar">
        <InfoBar isChatList={chatState.viewChatlist} username={username} />
        {chatState.viewChatlist ? (
          <div className="chatlist">
            <ChatList setUsername={setUsername} />
          </div>
        ) : null}
      </div>
    </OuterContainer>
  );
};

export default Chat;
