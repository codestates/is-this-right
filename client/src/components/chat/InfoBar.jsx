import React, { useEffect, useState } from 'react';
import { setIsChat, setViewChatlist, changeRoom, setMessages } from '../../actions/chatAction';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { LeftOutlined, CloseOutlined } from '@ant-design/icons';
const InfoBarContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  border-radius: 4px 4px 0 0;
  @media ${(props) => props.theme.mobile} {
    z-index: 999;
    border-radius: 0 0 0 0;
    top: 0;
  }
  .chatlist {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* background: #3a1d1d; */
    background: #023e8a;
    border-radius: 3px 3px 0 0;
    @media ${(props) => props.theme.mobile} {
      border-radius: 0 0 0 0;
    }
    .title {
      color: #eee;
      font-size: 1rem;
      font-weight: bold;
    }
    .rightInnerContainer {
      color: #eee;
    }
  }
  .messages {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgba(179, 200, 219, 0.95);
    border-bottom: 1px solid rgba(179, 200, 219, 0.9);
    border-radius: 3px 3px 0 0;
    .title {
      color: #353535;
      font-size: 1rem;
      font-weight: bold;
    }
  }

  .leftInnerContainer {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #666666;
    height: 100%;
    width: 70px;
    transition: 0.5s;
    :hover {
      font-size: 1.3rem;
      transition: 0.1s ease-in-out;
      cursor: pointer;
    }
    @media ${(props) => props.theme.mobile} {
      border-radius: 0;
    }
  }

  .rightInnerContainer {
    align-items: center;
    color: #666666;
    display: flex;
    width: 70px;
    height: 100%;
    justify-content: center;
    :hover {
      font-size: 1.3rem;
      transition: 0.1s ease-in-out;
      cursor: pointer;
    }
    @media ${(props) => props.theme.mobile} {
      border-radius: 0;
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
      <div className={isChatList ? 'chatlist' : 'messages'}>
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
      </div>
    </InfoBarContainer>
  );
};

export default InfoBar;
