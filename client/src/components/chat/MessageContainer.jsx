import React from 'react';
import Message from './Message';
import './styles/MessageContainer.css';
import { useSelector } from 'react-redux';

const MessageContainer = () => {
  const chatState = useSelector((state) => state.chatReducer);
  return (
    <div className="messages">
      {chatState.messages.map((message, i) => (
        <div key={i}>
          <Message message={message} />
        </div>
      ))}
    </div>
  );
};

export default MessageContainer;
