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

const StyledInfoBar = styled(InfoBar)`
  height: 60px;
`;
const OuterContainer = styled.div`
  height: 600px;
  width: 400px;
  position: fixed;
  bottom: 5vh;
  right: 5vw;
  border: 1px solid #dddddd;
  z-index: 999;
  border-radius: 10px;

  @media ${(props) => props.theme.mobile} {
    height: 85vh;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    border-radius: 0 0 0 0;
  }

  .chatContainer {
    display: flex;
    flex-direction: column;
    background: #ffffff;
    height: 100%;
    width: 100%;
    border-radius: 10px;

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
        <StyledInfoBar isChatList={chatState.viewChatlist} username={username} />
        {chatState.viewChatlist ? (
          <ChatList setUsername={setUsername} />
        ) : (
          <>
            <MessageContainer />
            <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
          </>
        )}
      </div>
    </OuterContainer>
  );
};

export default Chat;
