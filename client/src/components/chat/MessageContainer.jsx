import React from 'react';
import Message from './Message';
import './styles/MessageContainer.css';

const MessageContainer = ({ messages }) => (
  <div className="messages">
    {messages.map((message, i) => (
      <div key={i}>
        <Message message={message} />
      </div>
    ))}
  </div>
);

export default MessageContainer;
