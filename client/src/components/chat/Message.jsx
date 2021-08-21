import React from 'react';
import ReactEmoji from 'react-emoji';
import { Avatar, Image } from 'antd';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Moment from 'react-moment';

const BorderedAvatar = styled(Avatar)`
  border-radius: 30%;
`;

const MessageDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0 5%;
  margin-top: 10px;
  overflow-y: auto;

  .messageInfo {
    width: 100%;
  }

  .moment {
    display: flex;
    align-items: flex-end;
    color: #777777;
    font-size: 0.7rem;
    margin-left: 5px;
  }
  .name {
    display: flex;
    align-items: center;
    padding-left: 10px;
    color: #555555;
    font-size: 0.9rem;
  }
  .messageMoment {
    display: flex;
    justify-content: flex-start;
  }
  .messageBox {
    background: #f3f3f3;
    border-radius: 15px;
    padding: 10px 15px;
    color: white;
    display: inline-block;
    max-width: 80%;
    margin-left: 10px;
  }

  .messageText {
    width: 100%;
    letter-spacing: 0;
    float: left;
    font-size: 1rem;
    word-wrap: break-word;
  }

  .messageContainer {
    display: flex;
    justify-content: flex-end;
    padding: 0 5%;
    margin-top: 10px;
    overflow-y: auto;
  }

  .justifyStart {
    justify-content: flex-start;
  }

  .justifyEnd {
    justify-content: flex-end;
    overflow-y: auto;
  }

  .colorWhite {
    color: white;
  }

  .colorDark {
    color: #353535;
  }

  .backgroundBlue {
    background: #2979ff;
  }

  .backgroundLight {
    background: #f3f3f3;
  }
`;

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
    <MessageDiv className="messageContainer justifyEnd">
      <div className="moment">
        <Moment fromNow>{new Date(message.createdAt)}</Moment>
      </div>
      <div className="messageBox backgroundBlue">
        <span className="messageText colorWhite">{ReactEmoji.emojify(message.message)}</span>
      </div>
    </MessageDiv>
  ) : (
    <MessageDiv className="messageContainer justifyStart">
      <div className="avatar">
        <BorderedAvatar shape={'square'} size={40} src={<Image src={message.profileImg} height={40} width={40} />} />
      </div>
      <div className="messageInfo">
        <span className="name">{message.username}</span>
        <div className="messageMoment">
          <div className="messageBox backgroundLight">
            <span className="messageText colorDark">{ReactEmoji.emojify(message.message)}</span>
          </div>
          <div className="moment">
            <Moment fromNow>{new Date(message.createdAt)}</Moment>
          </div>
        </div>
      </div>
    </MessageDiv>
  );
};

export default Message;
