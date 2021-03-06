import React, { useRef, useEffect } from 'react';
import Message from './Message';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const MessagesContainer = styled.div`
  position: relative;
  background: rgba(179, 200, 219, 0.8);
  overflow-y: scroll;
  border-radius: 3px 3px 0 0;
  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    display: none;
  }
  height: 100%;
  padding-bottom: 10px;
`;
const MessageContainer = () => {
  const chatState = useSelector((state) => state.chatReducer);
  const msgContainer = useRef();

  const scrollToBottom = () => {
    const scroll = msgContainer.current.scrollHeight - msgContainer.current.clientHeight;
    msgContainer.current.scrollTo(0, scroll);
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatState.messages]);

  return (
    <MessagesContainer ref={msgContainer}>
      <div style={{ height: '70px' }} />
      {chatState.messages.map((message, i) => (
        <div key={i}>
          <Message message={message} />
        </div>
      ))}
    </MessagesContainer>
  );
};

export default MessageContainer;
