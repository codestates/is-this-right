import React from 'react';
import './styles/Message.css';
import ReactEmoji from 'react-emoji';
import { Avatar, Image } from 'antd';
import { useSelector } from 'react-redux';

const Message = ({ message }) => {
  const userState = useSelector((state) => state.userReducer);
  let isSentByCurrentUser = false;
  const name = userState.userInfo.role === 'adviser' ? userState.userInfo.name : userState.userInfo.username;
  const trimmedName = name.trim().toLowerCase();
  if (message.username === trimmedName) {
    isSentByCurrentUser = true;
  }

  //  상대방과 나의 메세지 렌더 위치를 조절 (유저 이름을 통해 구별)
  return isSentByCurrentUser ? (
    <div className="messageContainer justifyEnd">
      <p className="sentText pr-10">{trimmedName}</p>
      <div className="messageBox backgroundBlue">
        <p className="messageText colorWhite">{ReactEmoji.emojify(message.message)}</p>
      </div>
    </div>
  ) : (
    <div className="messageContainer justifyStart">
      <Avatar src={<Image src={message.profileImg} />} />
      <div className="messageBox backgroundLight">
        <p className="messageText colorDark">{ReactEmoji.emojify(message.message)}</p>
      </div>
      <p className="sentText pl-10 ">{message.username}</p>
    </div>
  );
};

export default Message;
