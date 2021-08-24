import React, { useState, useEffect } from 'react';
import { setIsChat } from '../../actions/chatAction';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Badge } from 'antd';
import { MessageFilled } from '@ant-design/icons';
const url = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

const FixDivStyle = styled.div`
  position: fixed;
  left: 85vw;
  top: 75vh;
  z-index: 999;
  @media ${(props) => props.theme.mobile} {
    display: none;
  }
`;

const Chatbutton = () => {
  const chatState = useSelector((state) => state.chatReducer);
  const userState = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const handleIsChat = () => {
    dispatch(setIsChat(true));
  };
  return (
    <>
      {userState.logIn ? (
        <FixDivStyle>
          <Badge count={chatState.newMessages}>
            <MessageFilled onClick={handleIsChat} style={{ fontSize: '75px', color: '#0096c7' }} />
          </Badge>
        </FixDivStyle>
      ) : null}
    </>
  );
};

export default Chatbutton;
