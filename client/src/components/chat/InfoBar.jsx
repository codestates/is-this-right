import React, { useEffect, useState } from 'react';
import { setIsChat, setViewChatlist, changeRoom, setMessages } from '../../actions/chatAction';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { LeftOutlined, CloseOutlined } from '@ant-design/icons';
const InfoBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #2979ff;
  min-height: 70px;
  width: 100%;
  border-radius: 10px 10px 0 0;
  @media ${(props) => props.theme.mobile} {
    border-radius: 0 0 0 0;
  }
  .title {
    color: white;
    font-size: 1.1rem;
  }
  .leftInnerContainer {
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    height: 100%;
    width: 70px;
    border-radius: 10px 0 0 0;
    transition: 0.5s;
    :hover {
      background: #0859e6;
    }
    @media ${(props) => props.theme.mobile} {
      border-radius: 0 0 0 0;
    }
  }

  .rightInnerContainer {
    align-items: center;
    color: white;
    display: flex;
    width: 70px;
    height: 100%;
    justify-content: center;
    border-radius: 0 10px 0 0;
    transition: 0.5s;
    :hover {
      background: #0859e6;
    }
    @media ${(props) => props.theme.mobile} {
      border-radius: 0 0 0 0;
    }
  }
`;
const InfoBar = ({ isChatList }) => {
  const dispatch = useDispatch();
  const chatState = useSelector((state) => state.chatReducer);
  const handleIsChat = () => {
    dispatch(setIsChat(false));
    dispatch(setViewChatlist(true));
    chatState.socket.emit('quitRoom');
    dispatch(setMessages([]));
    dispatch(changeRoom(null));
  };
  const handleChatlist = () => {
    dispatch(setViewChatlist(true));
    chatState.socket.emit('quitRoom');
    dispatch(setMessages([]));
    dispatch(changeRoom(null));
  };
  return (
    <InfoBarContainer>
      {isChatList ? (
        <div style={{ width: '70px' }} />
      ) : (
        <div className="leftInnerContainer" onClick={handleChatlist}>
          <LeftOutlined />
        </div>
      )}
      <div className="title">{isChatList ? '채팅' : chatState.roomName}</div>
      <div className="rightInnerContainer" onClick={handleIsChat}>
        <CloseOutlined />
      </div>
    </InfoBarContainer>
  );
};

export default InfoBar;
