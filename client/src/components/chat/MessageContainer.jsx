import React, { useRef, useEffect } from 'react';
import Message from './Message';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const MessagesContainer = styled.div`
  overflow-y: scroll;
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
      {chatState.messages.map((message, i) => (
        <div key={i}>
          <Message message={message} />
        </div>
      ))}
    </MessagesContainer>
  );
};

export default MessageContainer;
